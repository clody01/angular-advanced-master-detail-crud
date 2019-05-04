import {Component, OnInit} from '@angular/core';
import {EntryService} from '../shared/entry.service';
import {Entry} from '../shared/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) {}

  ngOnInit() {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries,
      error => alert('Error when opening a list'));
  }

  deleteEntry(entry) {
    const mustDelete = confirm('Do you want to delete this entry ?');
    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element.id != entry.id),
        () => alert('Error when deleting this entry '));
    }
  }
//  map(clients => clients.map(clt => clt.id == updatedClient.id ? updatedClient : clt)));
}
