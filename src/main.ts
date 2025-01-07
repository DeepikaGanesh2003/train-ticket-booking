import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,  // Existing config providers
    provideRouter(routes),
    provideHttpClient(withFetch())   // Provide the routing setup
  ]
})
  .catch((err) => console.error(err));
