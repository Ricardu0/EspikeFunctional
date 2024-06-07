<template>
  <div>
    <div id="map" :style="{ height: '90vh', width: '90vw' }"></div>
    <br>
    <Icon></Icon>
    <ModalComponent :isVisible="isModalVisible" @close="isModalVisible = false">
      <h3>{{ editMode ? 'Editar Ocorrência' : 'Registrar Ocorrência' }}</h3>
      <form @submit.prevent="submitOccurrence">
        <div>
          <label for="description">Descrição:</label>
          <input type="text" id="description" v-model="newOccurrence.description" required>
        </div>
        <div>
          <label for="type">Tipo de Ocorrência:</label>
          <select id="type" v-model="newOccurrence.type" required>
            <option value="1">Roubo</option>
            <option value="2">Furto</option>
            <option value="3">Vandalismo</option>
            <option value="4">Arrombamento</option>
            <option value="5">Tráfico de Drogas</option>
            <option value="6">Homicídio</option>
            <option value="7">Agressão Física</option>
            <!-- Adicione outros tipos de ocorrência conforme necessário -->
          </select>
        </div>
        <div>
          <label for="status">Status:</label>
          <select id="status" v-model="newOccurrence.status" required>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>
        <button type="submit">{{ editMode ? 'Salvar Alterações' : 'Salvar' }}</button>
      </form>
    </ModalComponent>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';
import ModalComponent from './Modal.vue';

export default {
  name: 'GoogleMap',
  components: { ModalComponent },
  props: {
    apiKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      map: null,
      markers: [],
      newOccurrence: {
        id: null,
        description: '',
        type: '',
        status: 'ativo', // Definido como 'ativo' por padrão
        position: null,
      },
      isModalVisible: false,
      editMode: false,
      mapHeight: '70vh', // 50% da altura da janela de visualização
    };
  },
  methods: {
    addMarker(event) {
      const position = event.latLng;
      const marker = new google.maps.Marker({
        position,
        map: this.map,
        draggable: true,
      });
      marker.addListener('click', () => {
        this.editOccurrence(marker);
      });
      marker.addListener('dragend', (e) => {
        this.updateMarkerPosition(marker, e);
      });
      marker.addListener('rightclick', () => {
        this.removeMarker(marker);
      });
      this.markers.push({ marker, occurrence: this.newOccurrence });

      // Abrir o modal para registrar a ocorrência
      this.newOccurrence.position = position;
      this.isModalVisible = true;
      this.editMode = false;
    },
    editOccurrence(marker) {
      const markerData = this.markers.find(m => m.marker === marker);
      if (markerData) {
        this.newOccurrence = { ...markerData.occurrence, position: marker.getPosition() };
        this.isModalVisible = true;
        this.editMode = true;
      }
    },
    updateMarkerPosition(marker, event) {
      marker.setPosition(event.latLng);
      const markerData = this.markers.find(m => m.marker === marker);
      if (markerData) {
        markerData.occurrence.latitude = event.latLng.lat();
        markerData.occurrence.longitude = event.latLng.lng();
      }
    },
    removeMarker(marker) {
      const index = this.markers.findIndex(m => m.marker === marker);
      if (index > -1) {
        marker.setMap(null);
        this.markers.splice(index, 1);
      }
    },
    async saveMarkers() {
      const markersData = this.markers.map(m => ({
        ...m.occurrence,
        latitude: m.marker.getPosition().lat(),
        longitude: m.marker.getPosition().lng()
      }));

      const response = await fetch('http://localhost:8080/api/markers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(markersData),
      });

      if (response.ok) {
        alert('Markers saved successfully!');
      } else {
        alert('Failed to save markers.');
      }
    },
    async fetchMarkers() {
      const response = await fetch('http://localhost:8080/api/markers');
      if (response.ok) {
        const markers = await response.json();
        markers.forEach(markerData => {
          const position = { lat: markerData.latitude, lng: markerData.longitude };
          const marker = new google.maps.Marker({
            position,
            map: this.map,
            draggable: true,
          });
          marker.addListener('click', () => {
            this.editOccurrence(marker);
          });
          marker.addListener('dragend', (e) => {
            this.updateMarkerPosition(marker, e);
          });
          marker.addListener('rightclick', () => {
            this.removeMarker(marker);
          });
          this.markers.push({ marker, occurrence: markerData });
        });
      } else {
        alert('Failed to load markers.');
      }
    },
    async submitOccurrence() {
      const occurrenceData = {
        id: this.newOccurrence.id,
        description: this.newOccurrence.description,
        occurrence_type: this.newOccurrence.type,
        latitude: this.newOccurrence.position.lat(),
        longitude: this.newOccurrence.position.lng(),
        date_time: new Date().toISOString(), // Adiciona a data e hora atuais
        status: this.newOccurrence.status // Adiciona o status selecionado
      };

      const method = this.editMode ? 'PUT' : 'POST';
      const url = this.editMode ? `http://localhost:8080/api/occurrences/${occurrenceData.id}` : 'http://localhost:8080/api/occurrences';
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(occurrenceData),
      });

      if (response.ok) {
        if (this.editMode) {
          const index = this.markers.findIndex(m => m.occurrence.id === occurrenceData.id);
          if (index > -1) {
            this.markers[index].occurrence = occurrenceData;
          }
        } else {
          const marker = new google.maps.Marker({
            position: this.newOccurrence.position,
            map: this.map,
            draggable: true,
          });
          marker.addListener('click', () => {
            this.editOccurrence(marker);
          });
          marker.addListener('dragend', (e) => {
            this.updateMarkerPosition(marker, e);
          });
          marker.addListener('rightclick', () => {
            this.removeMarker(marker);
          });
          this.markers.push({ marker, occurrence: occurrenceData });
        }
        alert('Occurrence saved successfully!');
        this.isModalVisible = false;
        this.newOccurrence = { id: null, description: '', type: '', status: 'ativo', position: null }; // Redefine para os valores padrão
      } else {
        alert('Failed to save occurrence.');
      }
    }
  },
  mounted() {
    const loader = new Loader({
      apiKey: this.apiKey,
      version: 'weekly',
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -23.5979089, lng: -46.9269129 },
        zoom: 16,
      });

      this.map.addListener('click', this.addMarker);

      this.fetchMarkers();

      const circleOverlay = new google.maps.Circle({
        strokeColor: 'rgba(255,255,255,0.18)',
        strokeOpacity: 0.5,
        fillColor: 'rgba(255,0,0,0.73)',
        fillOpacity: 0.3,
        radius: 500,
        center: { lat: -23.5979089, lng: -46.9269129 },
        map: this.map,
      });
    });
  },
};
</script>

<style>
/* Estilos padrão */
#map {
  width: 100%;
}

/* Estilos para telas pequenas (até 768px) */
@media only screen and (max-width: 768px) {
  #map {
    height: 80vh;
    width: 100%;
  }
}

/* Estilos para telas médias (entre 768px e 1024px) */
@media only screen and (min-width: 769px) and (max-width: 1024px) {
  #map {
    height: 60vh;
    width: 80vw;
  }
}

/* Estilos para telas grandes (acima de 1024px) */
@media only screen and (min-width: 1025px) {
  #map {
    height: 50vh;
    width: 90vw;
  }
}
</style>
