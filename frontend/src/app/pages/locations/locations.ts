import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNav } from '../../shared/header-nav/header-nav';
import { Footer } from '../../shared/footer/footer';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, HeaderNav, Footer],
  templateUrl: './locations.html',
  styleUrls: ['./locations.css']
})
export class LocationsComponent implements OnInit {

  ngOnInit(): void {
    const map = L.map('map').setView([14.6349, -90.5069], 6); // Center on Guatemala

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Custom Pokémon icon
    const pokeballIcon = L.icon({
      iconUrl: '/pokeball.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    // Our locations
    const points = [
      { name: 'Parque Las Americas', lat: 14.5891, lng: -90.5193 },
      { name: 'Cayalá', lat: 14.6142, lng: -90.4849 },
    ];

    points.forEach(p => {
      L.marker([p.lat, p.lng], { icon: pokeballIcon }).addTo(map).bindPopup(p.name);
    });
  }
}