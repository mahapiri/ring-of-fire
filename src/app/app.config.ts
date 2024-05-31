import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-a9c74","appId":"1:114780383467:web:8317cc7f90d115a74576ae","storageBucket":"ring-of-fire-a9c74.appspot.com","apiKey":"AIzaSyDipQ4tV9yh-g9ppKfPIoTAY6PHo7HjAU8","authDomain":"ring-of-fire-a9c74.firebaseapp.com","messagingSenderId":"114780383467"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideAnimationsAsync()]
};
