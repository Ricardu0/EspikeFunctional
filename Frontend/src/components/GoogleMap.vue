<template>
  <div>
    <div id="map" :style="{ height: '90vh', width: '95vw' }"></div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';

export default {
  name: 'GoogleMap',
  props: {
    apiKey: {
      type: String,
      required: true,
    },
    points: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      map: null,
      markers: [],
      circle: null,
    };
  },
  methods: {
    /**
     * Inicializa o mapa e adiciona os eventos necessários.
     */
    async initializeMap() {
      const loader = new Loader({
        apiKey: this.apiKey,
        version: 'weekly',
      });

      await loader.load();

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -23.5979089, lng: -46.9269129},
        zoom: 16,
      });

      // Evento de clique no mapa
      this.map.addListener('click', (event) => {
        const position = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        // Emitir evento para o componente pai abrir o formulário de ocorrência
        this.$emit('map-clicked', position);
      });

      // Adiciona os marcadores já existentes
      this.points.forEach((point) => this.addMarker(point));

      // Adiciona um círculo vermelho no mapa
      this.addCircle({lat: -23.5979089, lng: -46.9269129});
    },

    /**
     * Adiciona um marcador no mapa com base nos dados fornecidos.
     * @param {Object} point - Dados do marcador { latitude, longitude, description }.
     */
    addMarker(point) {
      const marker = new google.maps.Marker({
        position: {lat: point.latitude, lng: point.longitude},
        map: this.map,
        title: point.description || 'Marcador',
      });

      // Emitir evento quando o marcador for clicado
      marker.addListener('click', () => {
        this.$emit('marker-clicked', point);
      });

      this.markers.push(marker);
    },

    /**
     * Adiciona um círculo vermelho no mapa.
     * @param {Object} center - Coordenadas do centro do círculo { lat, lng }.
     */
    addCircle(center) {
      if (this.circle) {
        this.circle.setMap(null); // Remove o círculo anterior, se houver
      }

      this.circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.15,
        map: this.map,
        center: center,
        radius: 500, // Raio em metros
      });
    },

    /**
     * Remove todos os marcadores do mapa e reinicializa a lista.
     */
    clearMarkers() {
      this.markers.forEach((marker) => marker.setMap(null));
      this.markers = [];
    },
  },
  watch: {
    /**
     * Observa alterações nos pontos e atualiza os marcadores no mapa.
     */
    points(newPoints) {
      this.clearMarkers();
      newPoints.forEach((point) => this.addMarker(point));
    },
  },
  mounted() {
    this.initializeMap().catch((error) => {
      console.error('Erro ao inicializar o mapa:', error);
    });
  },
};
</script>
