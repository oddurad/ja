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
  logoUrlLow: string;
  nationalIdNumber: string;

  constructor(obj?) {
    this.name = obj['name'];
    this.first_name = obj['first_name'];
    this.middle_name = obj['middle_name'];
    this.last_name = obj['last_name'];
    this.occupation = obj['occupation'];
    this.address = obj['address'];
    this.companyType = obj['company_type'];
    this.logoUrl = obj['logo_url'] ? IMG_PREFIX + obj['logo_url'] : undefined;
    this.logoUrlLow = obj['logo_url_low'] ? IMG_PREFIX + obj['logo_url_low'] : undefined;
    this.nationalIdNumber = obj['national_id_number'];
  }
}