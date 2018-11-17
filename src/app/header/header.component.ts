import {Component, EventEmitter, Output} from '@angular/core'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    @Output('sectionChange') sectionChangeEmitter = new EventEmitter<string>();

    sectionChoose(section: string) {
        this.sectionChangeEmitter.emit(section);
    }

}