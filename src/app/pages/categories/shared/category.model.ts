import {BaseResourceModel} from '../../../shared/models/base-resource-model';

export class Category extends BaseResourceModel{
  public id?: number;
  public name: string;
  public description: string;
  constructor () {
    super();
  }
  /*constructor (
    public id: number,
    public name: string,
    public description: string
  ) {}*/
}
