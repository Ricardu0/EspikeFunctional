<template>
  <transition name="fade">
    <div class="map-view">
      <GoogleMap
          :apiKey="googleMapsApiKey"
          :points="processedPoints"
          @marker-clicked="onMarkerClicked"
          @map-clicked="onMapClick"
      />
      <br />
      <div v-if="showAlertForm" class="alert-form">
        <br />
        <h3 class="inline-block bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 cursor-pointer">
          Crie um Alerta
        </h3>
        <form @submit.prevent="submitAlert">
          <div>
            <br />
            <label for="alert_message">Mensagem:</label>
            <input
                type="text"
                id="alert_message"
                v-model="alertData.alert_message"
                required
                class="bg-gray-200 rounded-full p-1"
            />
            <br/>
          </div>
          <div>
            <label for="severity_level" class="text-left hover:text-center">Nível de Gravidade: </label>
            <select id="severity_level" v-model="alertData.severity_level" required>
              <option value="Low">Baixo</option>
              <option value="Medium">Médio</option>
              <option value="High">Alto</option>
            </select>
          </div>
          <div>
            <label for="alert_radius">Raio do Alerta (em metros):</label>
            <br/>
            <input
                type="number"
                id="alert_radius"
                v-model="alertData.alert_radius"
                required
                class="text-center bg-gray-200 rounded-full m-1"
            />
          </div>
          <br/>
          <button
              type="submit"
              class="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Enviando...' : 'Enviar Alerta' }}
          </button>
        </form>
        <button
            @click="closeAlertForm"
            class="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mt-2"
        >
          Fechar
        </button>
      </div>

      <div v-if="showOccurrenceForm" class="occurrence-form">
        <h3 class="bg-blue-900 text-white rounded-full p-2">Registrar Ocorrência</h3>
        <br>
        <form @submit.prevent="submitOccurrence">
          <div>
            <label for="description" class="p-2">Descrição:</label>
            <input
                type="text"
                id="description"
                v-model="occurrenceData.description"
                required
                class="bg-gray-200 rounded-full"
            />
          </div>
          <br>
          <div>
            <label for="occurrence_type" class="p-2">Tipo de Ocorrência: <br> </label>
            <select
                id="occurrence_type"
                v-model="occurrenceData.occurrence_type"
                required
                class="bg-gray-200 rounded-full p-1"
            >
              <option value="Crime">Crime</option>
              <option value="Acidente">Acidente</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <br>
          <button type="submit" class="bg-blue-400 rounded-full text-white p-3 hover:bg-blue-600">Enviar Ocorrência</button>
        </form>
        <button @click="closeOccurrenceForm" class="bg-red-600 text-white rounded-full p-3 m-1 hover:bg-red-800">Fechar</button>
      </div>

      <div v-if="selectedMarker" class="marker-info">
        <h3>Informações da Ocorrência</h3>
        <p>Descrição: {{ selectedMarker.description }}</p>
        <p>Tipo: {{ selectedMarker.occurrence_type }}</p>
        <p>Latitude: {{ selectedMarker.latitude }}</p>
        <p>Longitude: {{ selectedMarker.longitude }}</p>
        <p>Data e Hora: {{ selectedMarker.date_time }}</p>
      </div>

      <div v-if="alert.visible" class="alert-popup">
        <p><strong>Mensagem:</strong> {{ alert.message }}</p>
        <p><strong>Gravidade:</strong> {{ translateSeverity(alert.severity) }}</p>
        <p><strong>Hora:</strong> {{ formatTime(alert.time) }}</p>
      </div>

      <div v-if="notification.show" :class="['alert-popup', `notification-${notification.type}`]">
        {{ notification.message }}
      </div>

      <div class="menu-container">
        <div class="menu-items">
          <div class="menu-item" align="left">
            <MenuIcon />
          </div>
          <div class="menu-item center">
            <BackButton />
          </div>
          <div class="menu-item">
            <AlertButton rotaBtn="/Suspect" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import AlertButton from "@/components/AlertButton.vue";
import BackButton from "@/components/BackButton.vue";
import GoogleMap from "@/components/GoogleMap.vue";
import MenuIcon from "@/components/MenuIcon.vue";
import alertService from "@/services/alertService";
import MarkerService from '../services/markerService.js';
import OcurrenceService from '../services/ocurrenceService.js';

export default {
  name: "MapView",
  components: {
    BackButton,
    MenuIcon,
    GoogleMap,
    AlertButton,
  },
  data() {
    return {
      googleMapsApiKey: "",
      points: [],
      processedPoints: [],
      showAlertForm: false,
      showOccurrenceForm: false,
      selectedMarkerPosition: null,
      selectedMarker: null,
      isSubmitting: false,
      notification: {
        show: false,
        message: "",
        type: "info",
      },
      alertData: {
        alert_message: "",
        severity_level: "Low",
        alert_radius: 1000,
      },
      occurrenceData: {
        description: "",
        occurrence_type: "Crime",
      },
      alert: {
        visible: false,
        message: "",
        severity: "",
        time: "",
      },
      newOccurrence: null,
    };
  },
  mounted() {
    this.fetchMarkers();
    this.fetchPoints();
    this.checkForAlert();
    this.checkLatestAlert();
    this.fetchMarkers();

  setInterval( () => {
  this.refreshMarkers();
}, 30000);
},

// Método para limpar o intervalo quando o componente for destruído
beforeDestroy() {
  if (this.updateInterval) {
    clearInterval(this.updateInterval);
  }
},


methods: {
    async fetchPoints() {
      try {
        const response = await alertService.getAllAlerts();
        this.points = response;
      } catch (error) {
        this.showNotification('Erro ao carregar pontos no mapa', 'error');
      }
    },

    async checkLatestAlert() {
      try {
        const alerts = await alertService.getAllAlerts();
        if (alerts && alerts.length > 0) {
          // Pega o alerta mais recente
          const latestAlert = alerts.sort((a, b) =>
              new Date(b.alert_time) - new Date(a.alert_time)
          )[0];

          // Usa a estrutura existente do alert
          this.alert = {
            visible: true,
            message: latestAlert.alert_message,
            severity: latestAlert.severity_level,
            time: latestAlert.alert_time
          };

          // Define o timer para esconder o alerta após 15 segundos
          setTimeout(() => {
            this.alert.visible = false;
          }, 15000);
        }
      } catch (error) {
        console.error('Erro ao buscar alertas:', error);
      }
    },

    async fetchMarkerInfo(markerId) {
      try {
        if (!markerId) {
          throw new Error('ID do marcador está undefined');
        }
        const response = await MarkerService.getMarkerById(markerId);
        this.selectedMarker = response;
      } catch (error) {
        console.error('Erro ao buscar informações do marcador:', error);
        this.showNotification('Erro ao buscar informações do marcador.', 'error');
      }
    },

    async fetchMarkers() {
      try {
        console.log('Buscando marcadores...');
        const markers = await MarkerService.getAllMarkers();
        console.log('Markers recebidos do backend:', markers);

        // Garante que todos os marcadores têm as propriedades necessárias
        this.processedPoints = markers.map(marker => ({
          latitude: parseFloat(marker.latitude),
          longitude: parseFloat(marker.longitude),
          description: marker.description || 'Sem descrição',
          id: marker.id || marker._id,
          occurrence_type: marker.occurrence_type,
          date_time: marker.date_time
        }));

        console.log('Pontos processados:', this.processedPoints);
      } catch (error) {
        console.error('Erro ao buscar marcadores:', error);
        this.showNotification('Erro ao carregar marcadores', 'error');
      }
    },

    async refreshMarkers() {
      await this.fetchMarkers();
    },


    checkForAlert() {
      const alert = this.$route.query.alert;
      if (alert) {
        this.showAlertForm = true;
      }
    },

    async submitAlert() {
      try {
        this.isSubmitting = true;
        if (!this.alertData.alert_message || !this.alertData.severity_level || !this.alertData.alert_radius) {
          throw new Error('Por favor, preencha todos os campos obrigatórios');
        }

        const position = await this.getUserPosition();
        const userId = localStorage.getItem('userId');

        if (!userId) {
          throw new Error('Usuário não autenticado. userId ausente.');
          throw new Error('Usuário não autenticado. userId ausente.');
        }

        const alertData = {
          alert_radius: Number(this.alertData.alert_radius),
          severity_level: this.alertData.severity_level,
          alert_message: this.alertData.alert_message,
          latitude: position.latitude,
          longitude: position.longitude,
          alert_time: new Date().toISOString(),
          user_id: userId
        };

        await alertService.createAlert(alertData);
        this.showNotification('Alerta criado com sucesso!', 'success');
        this.showAlertForm = false;
        await this.fetchPoints();
        this.alertData = { alert_message: "", severity_level: "Low", alert_radius: 1000 };
      } catch (error) {
        console.error('Erro ao submeter alerta:', error);
        let errorMessage = 'Erro ao criar alerta.';
        if (error.response?.data?.message) {
          errorMessage += ' ' + error.response.data.message;
        } else if (error.message) {
          errorMessage += ' ' + error.message;
        }
        this.showNotification(errorMessage, 'error');
      } finally {
        this.isSubmitting = false;
      }
    },

      async submitOccurrence() {
        try {
          // Validação detalhada dos campos
          const validationErrors = [];

          if (!this.occurrenceData.description?.trim()) {
            validationErrors.push('Descrição é obrigatória');
          }

          if (!this.occurrenceData.occurrence_type) {
            validationErrors.push('Tipo de ocorrência é obrigatório');
          }

          if (!this.selectedMarkerPosition) {
            validationErrors.push('Selecione um local no mapa');
          } else {
            if (typeof this.selectedMarkerPosition.lat !== 'number' ||
                isNaN(this.selectedMarkerPosition.lat)) {
              validationErrors.push('Latitude inválida');
            }
            if (typeof this.selectedMarkerPosition.lng !== 'number' ||
                isNaN(this.selectedMarkerPosition.lng)) {
              validationErrors.push('Longitude inválida');
            }
          }

          if (validationErrors.length > 0) {
            throw new Error(`Erros de validação: ${validationErrors.join(', ')}`);
          }

          // Preparar dados da ocorrência
          const occurrenceData = {
            description: this.occurrenceData.description.trim(),
            occurrence_type: this.occurrenceData.occurrence_type,
            latitude: this.selectedMarkerPosition.lat,
            longitude: this.selectedMarkerPosition.lng,
            date_time: new Date().toISOString(),
            status: 'ativo'
          };

          // Log para debug
          console.log('Enviando dados:', occurrenceData);

          // Fazer a requisição usando OcurrenceService
          const savedOccurrence = await OcurrenceService.createOcurrence(occurrenceData);
          console.log('Ocorrência salva com sucesso:', savedOccurrence);

          // Atualizar a lista de pontos e fechar o formulário
          this.points.push(savedOccurrence);
          this.showNotification('Ocorrência registrada com sucesso!', 'success');
          this.showOccurrenceForm = false;
          this.resetForm();

        } catch (error) {
          console.error('Erro ao submeter ocorrência:', error);
          this.showNotification(error.message, 'error');
        }
      },

// Método auxiliar para resetar o formulário
    resetForm() {
      this.occurrenceData = {
        description: '',
        occurrence_type: 'Crime' // ou outro valor padrão que você use
      };
      this.selectedMarkerPosition = null;
    },

    onMapClick(event) {
      this.selectedMarkerPosition = {
        lat: event.lat,
        lng: event.lng
      };
      this.showOccurrenceForm = true;
    },

    onMarkerClicked(marker) {
      const markerId = marker.id || marker._id;
      if (!markerId) {
        console.error('ID do marcador está undefined');
        return;
      }
      this.fetchMarkerInfo(markerId);
    },

    getUserPosition() {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocalização não é suportada pelo seu navegador.'));
          return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              let errorMessage = 'Erro ao obter localização.';
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  errorMessage = 'Permissão de localização negada.';
                  break;
                case error.POSITION_UNAVAILABLE:
                  errorMessage = 'Informação de localização indisponível.';
                  break;
                case error.TIMEOUT:
                  errorMessage = 'Tempo esgotado ao obter localização.';
                  break;
              }
              reject(new Error(errorMessage));
            }
        );
      });
    },

    closeAlertForm() {
      this.showAlertForm = false;
      this.alertData = {
        alert_message: "",
        severity_level: "Low",
        alert_radius: 1000,
      };
    },

    closeOccurrenceForm() {
      this.showOccurrenceForm = false;
      this.occurrenceData = {
        description: "",
        occurrence_type: "Crime",
      };
      this.selectedMarkerPosition = null;
    },

    showNotification(message, type = 'info') {
      this.notification = {
        show: true,
        message,
        type
      };
      setTimeout(() => {
        this.notification.show = false;
      }, 5000);
    },

    translateSeverity(severity) {
      const translations = {
        Low: 'Baixo',
        Medium: 'Médio',
        High: 'Alto',
      };
      return translations[severity] || severity;
    },

    formatTime(time) {
      return new Date(time).toLocaleTimeString('pt-BR');
    }
  },
};

</script>



<style scoped>
.map-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;
  height: 100vh;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.menu-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.menu-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  opacity: 1;
}

.menu-item {
  flex: 1;
  display: flex;
  justify-content: center;
}

.center {
  text-align: center;
}

.alert-form,
.occurrence-form {
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  opacity: 1;
}

.alert-popup {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  opacity: 100%;
  z-index: 1000;
}

.notification-success {
  background-color: #48bb78;
  color: white;
}

.notification-error {
  background-color: #f56565;
  color: white;
}

.notification-info {
  background-color: #4299e1;
  color: white;
}

.marker-info { border: 1px solid #ccc; padding: 10px; border-radius: 5px; background-color: #f9f9f9; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); max-width: 300px; margin-top: 10px;}
</style>