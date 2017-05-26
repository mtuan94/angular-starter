import { Clone } from './clone';

export interface Task{
  postData?: any;
  arrayClone?: Array<Clone>;
  indexClone?: number;
  timeDuration?: number;
  isUpvote?: boolean;
  randomArrayTime?: Array<number>;
  couter?: number;
  success?: number;
  fallue?: number;
}