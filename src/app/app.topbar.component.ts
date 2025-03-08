import {Component} from '@angular/core';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import { RootScopeData } from './rootScope/rootScopeData';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    userInfo:any;
    constructor(public appMain: AppMainComponent, public app: AppComponent) {
        this.userInfo = RootScopeData.userInfo;
    }
    getImageSrc(base64String: string): string {
        if (!base64String) {
            return 'path/to/default/image.jpg'; // Default image if none provided
        }

        if (!base64String.startsWith('data:image')) {
            return 'data:image/jpeg;base64,' + base64String;
        }

        return base64String;
    }
}
