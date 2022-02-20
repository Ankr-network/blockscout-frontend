import { StatusCircleStatus } from 'uiKit/StatusCircle/StatusCircleProps';
import {
  NODE_TRUST_SCORE_ERROR,
  NODE_TRUST_SCORE_WARNING,
  NODE_TRUST_SCORE_WATCH,
} from '../constants/node';

export function getStatusByNodeScore(score: number): StatusCircleStatus {
  switch (true) {
    case score >= NODE_TRUST_SCORE_WATCH: {
      return 'success';
    }
    case score >= NODE_TRUST_SCORE_WARNING: {
      return 'warning';
    }
    case score === NODE_TRUST_SCORE_ERROR: {
      return 'error';
    }
    default: {
      return 'info';
    }
  }
}
