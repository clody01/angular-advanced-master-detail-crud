import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDatabase implements InMemoryDbService {

  createDb() {
    const categories = [
      {id: 1, name: 'Mamadou', description: 'For Mamadou'},
      {id: 2, name: 'Claude', description: 'For Claude'},
      {id: 3, name: 'Jean', description: 'For Jean'},
      {id: 4, name: 'Moussa', description: 'For Moussa'},
      {id: 5, name: 'Vanga', description: 'For Vanga'},
      {id: 6, name: 'Rodrigue', description: 'For Rodrigue'},
      {id: 7, name: 'Viviane', description: 'For Viviane'},
      {id: 8, name: 'Mireille', description: 'For Mireille'}
    ];
    return {categories};
  }

}
