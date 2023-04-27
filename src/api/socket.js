import { EVENT_TYPES, SOCKET_URL } from '../constants';
import UserService from '../services/UserService';

class Socket {
  constructor() {
    this.client = null;
    this.isConnect = false;
    this.functions = {};
    this.forceClose = false;
    this.id = null;
  }

  async connect(id, token) {
    this.id = id;
    this.client = new WebSocket(SOCKET_URL(id, token));
    this.isConnect = true;
    this.forceClose = false;

    this.client.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.eventType) {
        case EVENT_TYPES.ISSUES:
          this.functions[EVENT_TYPES.ISSUES]();
          break;
        case EVENT_TYPES.SELECT:
          this.functions[EVENT_TYPES.SELECT]();
          break;
        case EVENT_TYPES.VOTES:
          this.functions[EVENT_TYPES.VOTES]();
          break;
        case EVENT_TYPES.JOIN:
          this.functions[EVENT_TYPES.JOIN]();
          break;
        case EVENT_TYPES.LEAVE:
          this.functions[EVENT_TYPES.JOIN]();
          break;
      }
    };

    this.client.onclose = async () => {
      if (this.forceClose) {
        this.functions = {};
      } else {
        await this.connect(this.id, UserService.getToken());

        await this.functions[EVENT_TYPES.VOTES]();
        await this.functions[EVENT_TYPES.ISSUES]();
        await this.functions[EVENT_TYPES.SELECT]();
        await this.functions[EVENT_TYPES.JOIN]();
      }
    };

    this.client.onerror = () => {
      this.client.close();
    };
  }

  async close() {
    this.forceClose = true;
    this.client.close();
    this.client = null;
    this.isConnect = false;
    this.id = null;
  }

  setFunctions(functions) {
    this.functions = functions;
  }

  send(eventType, issueId) {
    if (this.client.readyState) {
      this.client.send(
        JSON.stringify({
          eventType,
          issueId,
        }),
      );
    }
  }
}

export const client = new Socket();
