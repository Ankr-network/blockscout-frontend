import { BaseStatus } from 'uiKit/types/status';
import {
  NODE_TRUST_SCORE_ERROR,
  NODE_TRUST_SCORE_GOOD,
  NODE_TRUST_SCORE_WARNING,
  NODE_TRUST_SCORE_WATCH,
} from '../constants/node';
import { NodeStatus } from '../types/node';

export function getBaseStatusByNodeStatus(nodeStatus: NodeStatus): BaseStatus {
  switch (nodeStatus) {
    case NodeStatus.GOOD:
    case NodeStatus.WATCH: {
      return BaseStatus.success;
    }

    case NodeStatus.WARNING: {
      return BaseStatus.warning;
    }

    case NodeStatus.ERROR: {
      return BaseStatus.error;
    }

    default: {
      return BaseStatus.success;
    }
  }
}

export function getNodeStatusByScore(score: number): NodeStatus {
  switch (true) {
    case score >= NODE_TRUST_SCORE_GOOD: {
      return NodeStatus.GOOD;
    }

    case score >= NODE_TRUST_SCORE_WATCH: {
      return NodeStatus.WATCH;
    }

    case score >= NODE_TRUST_SCORE_WARNING: {
      return NodeStatus.WARNING;
    }
    case score === NODE_TRUST_SCORE_ERROR: {
      return NodeStatus.ERROR;
    }
    default: {
      return NodeStatus.ERROR;
    }
  }
}
