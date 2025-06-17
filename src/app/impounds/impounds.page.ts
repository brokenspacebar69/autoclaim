import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

interface ImpoundLot {
  name: string;
  position: { lat: number; lng: number; };
  distance?: number; // calculated distance from user
}

@Component({
  selector: 'app-impounds',
  templateUrl: './impounds.page.html',
  styleUrls: ['./impounds.page.scss'],
  standalone: false
})
export class ImpoundsPage implements OnInit {

  // Cebu as default
  center: { lat: number; lng: number; } = { lat: 10.3157, lng: 123.8854 };
  userMarker: { lat: number; lng: number; } | null = null;

  impoundLots: ImpoundLot[] = [
    { name: 'Cebu City Impound Lot', position: { lat: 10.3157, lng: 123.8854 } },
    { name: 'Mandaue Impound Lot', position: { lat: 10.3301, lng: 123.9411 } },
    { name: 'Lapu-Lapu Impound Lot', position: { lat: 10.3076, lng: 123.9566 } },
    // Add more as needed
  ];

  nearbyImpounds: ImpoundLot[] = [];

  ngOnInit() {
    this.locateUser();
  }

  async locateUser() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.center = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };
      this.userMarker = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };
      this.updateNearbyImpounds();
    } catch (err) {
      console.log('Geolocation error:', err);
      this.updateNearbyImpounds();
    }
  }

  getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  updateNearbyImpounds() {
    if (!this.userMarker) {
      this.nearbyImpounds = this.impoundLots;
      return;
    }
    this.nearbyImpounds = this.impoundLots
      .map((lot: ImpoundLot) => ({
        ...lot,
        distance: this.getDistanceKm(
          this.userMarker!.lat, this.userMarker!.lng,
          lot.position.lat, lot.position.lng
        )
      }))
      .filter((lot: ImpoundLot) => lot.distance !== undefined && lot.distance <= 10)
      .sort((a, b) => (a.distance! - b.distance!));
  }
}
