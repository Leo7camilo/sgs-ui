import { EngagementClientDetailed } from "./engagementClientDetailed";
import { EngagementClientSumarized } from "./engagementClientSumarized";

export interface EngagementClient{
  listEngagementClientSumarized: EngagementClientSumarized[];
  listEngagementClientDetailed: EngagementClientDetailed[];
}
