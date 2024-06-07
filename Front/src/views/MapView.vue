<template>
  <transition name="fade">
    <div class="map-view">
      <GoogleMap :apiKey="googleMapsApiKey" :points="points" @marker-clicked="onMarkerClicked" />
      <br>
      <div v-if="showAlertForm" class="alert-form">
        <h3>Criar Alerta</h3>
        <form @submit.prevent="submitAlert">
          <div>
            <label for="alert_message">Mensagem:</label>
            <input type="text" id="alert_message" v-model="alertData.alert_message" required>
          </div>
          <div>
            <label for="severity_level">Nível de Gravidade:</label>
            <select id="severity_level" v-model="alertData.severity_level" required>
              <option value="Low">Baixo</option>
              <option value="Medium">Médio</option>
              <option value="High">Alto</option>
            </select>
          </div>
          <div>
            <label for="alert_radius">Raio do Alerta (em metros):</label>
            <input type="number" id="alert_radius" v-model="alertData.alert_radius" required>
          </div>
          <button type="submit">Enviar Alerta</button>
        </form>
      </div>
      <div v-if="showOccurrenceForm" class="occurrence-form">
        <h3>Registrar Ocorrência</h3>
        <form @submit.prevent="submitOccurrence">
          <div>
            <label for="occurrence_description">Descrição:</label>
            <input type="text" id="occurrence_description" v-model="occurrenceData.description" required>
          </div>
          <div>
            <label for="occurrence_type">Tipo de Ocorrência:</label>
            <select id="occurrence_type" v-model="occurrenceData.occurrence_type" required>
              <option value="Crime">Crime</option>
              <option value="Acidente">Acidente</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <button type="submit">Enviar Ocorrência</button>
        </form>
      </div>
      <div v-if="alert.visible" class="alert-popup">
        <p><strong>Mensagem:</strong> {{ alert.message }}</p>
        <p><strong>Gravidade:</strong> {{ alert.severity }}</p>
        <p><strong>Hora:</strong> {{ alert.time }}</p>
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
            <AlertButton rotaBtn="/Suspect"> </AlertButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import GoogleMap from '@/components/GoogleMap.vue';
import axios from 'axios';
import MenuIcon from "@/components/MenuIcon.vue";
import AlertButton from "@/components/AlertButton.vue";
import BackButton from "@/components/BackButton.vue";

export default {
  name: 'MapView',
  components: {
    BackButton,
    MenuIcon,
    GoogleMap,
    AlertButton
  },
  data() {
    return {
      googleMapsApiKey: '',
      points: [],
      showAlertForm: false,
      showOccurrenceForm: false,
      selectedMarkerPosition: null,
      alertData: {
        alert_message: '',
        severity_level: 'Low',
        alert_radius: 1000 // Defina um valor padrão
      },
      occurrenceData: {
        description: '',
        occurrence_type: 'Crime'
      },
      alert: {
        visible: false,
        message: '',
        severity: '',
        time: ''
      }
    };
  },
  mounted() {
    this.fetchPoints();
    this.checkForAlert();
  },
  methods: {
    fetchPoints() {
      axios.get('/points')
        .then(response => {
          this.points = response.data;
        })
        .catch(error => {
          console.error('Error fetching points:', error);
        });
    },
    checkForAlert() {
      const alert = this.$route.query.alert;
      if (alert) {
        this.showAlertForm = true;
      }
    },
    async submitAlert() {
      const position = await this.getUserPosition();
      const alertData = {
        alert_radius: this.alertData.alert_radius,
        severity_level: this.alertData.severity_level,
        alert_message: this.alertData.alert_message,
        latitude: position.latitude,
        longitude: position.longitude,
        alert_time: new Date().toISOString()
      };

      const response = await fetch('http://localhost:8080/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alertData),
      });

      if (response.ok) {
        this.showAlertForm = false;
        this.displayAlert(alertData);
      } else {
        alert('Falha ao enviar alerta.');
      }
    },
    getUserPosition() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          }, () => {
            reject(new Error('Failed to get current position.'));
          });
        } else {
          reject(new Error('Geolocation is not supported by this browser.'));
        }
      });
    },
    displayAlert(alertData) {
      this.alert = {
        visible: true,
        message: alertData.alert_message,
        severity: alertData.severity_level,
        time: new Date(alertData.alert_time).toLocaleTimeString()
      };

      setTimeout(() => {
        this.alert.visible = false;
      }, 1800000); // 30 minutos
    },
    onMarkerClicked(position) {
      this.selectedMarkerPosition = position;
      this.showOccurrenceForm = true;
    },
    async submitOccurrence() {
      if (!this.selectedMarkerPosition) return;

      const occurrenceData = {
        ...this.occurrenceData,
        latitude: this.selectedMarkerPosition.lat,
        longitude: this.selectedMarkerPosition.lng,
        date_time: new Date().toISOString()
      };

      const response = await fetch('http://localhost:8080/api/occurrences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(occurrenceData),
      });

      if (response.ok) {
        this.showOccurrenceForm = false;
        alert('Ocorrência registrada com sucesso!');
      } else {
        alert('Falha ao registrar ocorrência.');
      }
    }
  }
};
</script>

<style scoped>
.map-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  opacity: 0; /* Inicia com a div invisível */
  animation: fadeIn 1s ease-in forwards; /* Animação para tornar a div visível */
  height: 100vh; /* Garantir que o contêiner ocupe a altura total da tela */
}

@keyframes fadeIn {
  to {
    opacity: 1; /* Faz a div se tornar completamente visível ao final da animação */
  }
}

.menu-container {
  display: flex;
  justify-content: center; /* Centraliza o contêiner do menu */
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0; /* Estende o contêiner do menu por toda a largura */
}

.menu-items {
  display: flex;
  justify-content: space-between; /* Distribui igualmente os itens do menu */
  align-items: center;
  width: 90%; /* Garante que os itens do menu usem toda a largura do contêiner */
}

.menu-item {
  flex: 1; /* Permite que os itens do menu ocupem espaço igual */
  display: flex;
  justify-content: center; /* Centraliza o conteúdo dentro de cada item do menu */
}

.center {
  text-align: center; /* Centraliza o conteúdo textual do botão de voltar */
}

.alert-form,
.occurrence-form {
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.alert-popup {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #ffcc00;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
