const IMG_PREFIX = 'https://media.ja.is/';

export class SearchResult {
  name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  occupation: string;
  address: string;
  companyType: Array<string>;
  logoUrl: string;
  nationalIdNumber: string;
  vatNumber: string;
  phone: object;
  additionalPhones: Array<object>;
  email: string;
  social: Array<object>;
  isPerson: boolean;
  postalStation: string;
  geo: object;

  constructor(obj?) {
    this.name = obj['name'];
    this.first_name = obj['first_name'];
    this.middle_name = obj['middle_name'];
    this.last_name = obj['last_name'];
    this.occupation = obj['occupation'];
    this.address = obj['address'];
    this.companyType = obj['company_type'];
    this.logoUrl = obj['logo_url'] ? IMG_PREFIX + obj['logo_url'] : undefined;
    this.nationalIdNumber = obj['national_id_number'];
    this.vatNumber = obj['vat_number'];
    this.phone = obj['phone'];
    this.additionalPhones = obj['additional_phones'];
    this.email = obj['email'];
    this.social = obj['social'];
    this.isPerson = obj['is_person'];
    this.postalStation = obj['postal_station'];
    this.geo = obj['geo'];
  }
}