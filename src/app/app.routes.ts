import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';

export const routes: Routes = [
    { path: '', component: SearchComponent },
    { path: 'results', component: ResultComponent },
];
