import {OnInit} from '@angular/core';
import {BaseResourceModel} from '../../models/base-resource.model';
import {BaseResourceService} from '../../services/base-resource.service';


export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {
  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) {
  }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      resources => this.resources = resources.sort((a, b) => b.id - a.id),
      error => alert('Error when opening a list'));
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Do you want to delete this entry ?');
    if (mustDelete) {
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element.id != resource.id),
        () => alert('Deleting Error'));
    }
  }

}
