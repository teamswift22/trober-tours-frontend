export type TourDetails = {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  price?: number;
  category?: string;
  destination?: object;
  startingPoint?: object;
  transportation?: object;
  accomodation?: object;
};

export type HandleTourSubmission = (
  data: TourDetails,
  next?: boolean
) => Promise<void>;

export interface CreateTourComponentsProps {
  handleTourSubmission?: HandleTourSubmission;
  tourDetails?: TourDetails;
  next?: boolean;
  moveToNextPage?: () => void;
  formId?: string | undefined;
}
