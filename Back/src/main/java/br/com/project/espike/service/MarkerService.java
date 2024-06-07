package br.com.project.espike.service;

import br.com.project.espike.model.Marker;
import br.com.project.espike.repository.MarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarkerService {

    @Autowired
    private MarkerRepository markerRepository;

    public List<Marker> getAllMarkers() {
        return markerRepository.findAll();
    }

    public List<Marker> saveMarkers(List<Marker> markers) {
        markerRepository.deleteAll();
        return markerRepository.saveAll(markers);
    }
}
