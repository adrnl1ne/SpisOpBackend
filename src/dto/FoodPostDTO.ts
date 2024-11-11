import { Allergy } from '../entities/Allergy';
import { Community } from '../entities/Community';
import { Company } from '../entities/Company';
import { User } from '../entities/User';

export interface FoodPostDTO {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  authorUser: User; // Replace with UserDTO if needed
  createdAt: Date;
  lastUpdated: Date;
  authorCompany: Company; // Replace with CompanyDTO if needed
  community: Community; // Replace with CommunityDTO if needed
  allergies: Set<Allergy>;
}
