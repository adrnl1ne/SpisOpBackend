import { Request, Response, Router } from 'express';
import { FoodPostService } from '../services/FoodPostService';
import { FoodPostDTO } from '../dto/FoodPostDTO';
import { FoodPost } from '../entities/FoodPost';

export class FoodPostController {
  public router: Router;
  private foodPostService: FoodPostService;

  constructor() {
    this.router = Router();
    this.foodPostService = new FoodPostService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/foodposts', this.getAllFoodPosts);
    this.router.get('/foodposts/:id', this.getFoodPostById);
    this.router.get('/foodposts/user/:userId', this.getFoodPostsByUserId);
    this.router.get('/community/:id/foodposts', this.getCommunityFoodPosts);
    this.router.post('/foodpost/community', this.createFoodPostForCommunity);
    this.router.post('/foodpost/company', this.createFoodPostForCompany);
    this.router.put('/foodposts/:id', this.updateFoodPost);
    this.router.delete('/foodposts/:id', this.deleteFoodPost);
  }

  // GET all food posts
  private getAllFoodPosts = async (req: Request, res: Response): Promise<void> => {
    const foodPosts: FoodPost[] = await this.foodPostService.getFoodPosts();
    const foodPostDTOs: FoodPostDTO[] = foodPosts.map(foodPost => this.foodPostService.toDto(foodPost));
    res.json(foodPostDTOs);
  };

  // GET a specific food post by ID
  private getFoodPostById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const foodPost: FoodPost = await this.foodPostService.getFoodPostById(id);
    res.json(this.foodPostService.toDto(foodPost));
  };

  // GET food posts by user ID
  private getFoodPostsByUserId = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    const foodPosts: FoodPost[] = await this.foodPostService.getFoodPostsByUserId(userId);
    res.json(foodPosts.map(foodPost => this.foodPostService.toDto(foodPost)));
  };

  // GET food posts for a specific community by community ID
  private getCommunityFoodPosts = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const foodPosts: FoodPost[] = await this.foodPostService.getCommunityFoodPosts(id);
    res.json(foodPosts.map(foodPost => this.foodPostService.toDto(foodPost)));
  };

  // POST a new food post for a community
  private createFoodPostForCommunity = async (req: Request, res: Response): Promise<void> => {
    const foodPost: FoodPost = req.body;
    const savedFoodPost: FoodPost = await this.foodPostService.saveFoodPost(foodPost);
    res.json(this.foodPostService.toDto(savedFoodPost));
  };

  // POST a new food post for a company
  private createFoodPostForCompany = async (req: Request, res: Response): Promise<void> => {
    const foodPost: FoodPost = req.body;
    const savedFoodPost: FoodPost = await this.foodPostService.saveFoodPost(foodPost);
    res.json(this.foodPostService.toDto(savedFoodPost));
  };

  // PUT to update a food post by ID
  private updateFoodPost = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const foodPostDetails: FoodPost = req.body;
    const updatedFoodPost: FoodPost = await this.foodPostService.updateFoodPost(id, foodPostDetails);
    res.json(this.foodPostService.toDto(updatedFoodPost));
  };

  // DELETE a food post by ID
  private deleteFoodPost = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    await this.foodPostService.deleteFoodPost(id);
    res.sendStatus(204); // No content
  };
}
