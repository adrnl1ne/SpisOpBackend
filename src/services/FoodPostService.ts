import { FoodPost } from '../entities/FoodPost';
import { FoodPostDTO } from '../dto/FoodPostDTO';
import { AppDataSource } from '../data-source';

export class FoodPostService {
  private foodPostRepo = AppDataSource.getRepository(FoodPost);

  // Convert FoodPost entity to DTO
  toDto(foodPost: FoodPost): FoodPostDTO {
    return {
      id: foodPost.id,
      image: foodPost.image,
      title: foodPost.title,
      description: foodPost.description,
      price: foodPost.price,
      authorUser: foodPost.authorUser,
      authorCompany: foodPost.authorCompany,
      community: foodPost.community,
      allergies: foodPost.allergies,
      createdAt: foodPost.createdAt,
      lastUpdated: foodPost.lastUpdated,
    };
  }

  // Retrieve all FoodPosts
  async getFoodPosts(): Promise<FoodPost[]> {
    return await this.foodPostRepo.find();
  }

  // Retrieve a specific FoodPost by ID
  async getFoodPostById(id: number): Promise<FoodPost | null> {
    return await this.foodPostRepo.findOneBy({ id }) || null;
  }

  // Retrieve FoodPosts by a specific user ID
  async getFoodPostsByUserId(userId: string): Promise<FoodPost[]> {
    return await this.foodPostRepo.find({
      where: { authorUser: { id: userId } },
      relations: ['authorUser', 'authorCompany', 'community', 'allergies'],
    });
  }

  // Retrieve FoodPosts for a specific community by community ID
  async getCommunityFoodPosts(id: number): Promise<FoodPost[]> {
    return await this.foodPostRepo.find({
      where: { community: { id } },
      relations: ['authorUser', 'authorCompany', 'community', 'allergies'],
    });
  }

  // Save a new FoodPost
  async saveFoodPost(foodPost: FoodPost): Promise<FoodPost> {
    return await this.foodPostRepo.save(foodPost);
  }

  // Update an existing FoodPost by ID
  async updateFoodPost(id: number, foodPostDetails: FoodPost): Promise<FoodPost | null> {
    const foundFoodPost = await this.foodPostRepo.findOneBy({ id });

    if (!foundFoodPost) {
      return null;
    }

    // Update properties as needed
    foundFoodPost.image = foodPostDetails.image;
    foundFoodPost.title = foodPostDetails.title;
    foundFoodPost.description = foodPostDetails.description;
    foundFoodPost.price = foodPostDetails.price;
    foundFoodPost.authorUser = foodPostDetails.authorUser;
    foundFoodPost.authorCompany = foodPostDetails.authorCompany;
    foundFoodPost.community = foodPostDetails.community;
    foundFoodPost.allergies = foodPostDetails.allergies;
    foundFoodPost.lastUpdated = new Date(); // Set update timestamp

    return await this.foodPostRepo.save(foundFoodPost);
  }

  // Delete a FoodPost by ID
  async deleteFoodPost(id: number): Promise<void> {
    await this.foodPostRepo.delete(id);
  }
}
