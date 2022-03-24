import { notification } from "antd";
import axios from "axios";

const VMVP_API_BASE_URL = "http://localhost:4047/api/v1";
// const VMVP_API_BASE_URL = "https://vmvp-api.herokuapp.com/api/v1";

var config = {
  headers: {
    "Content-Type": "application/json",
  },
};

class VmvpApis {
  async getAllStudents() {
    try {
      const res = await axios.get(VMVP_API_BASE_URL + "/students", config);

      return res;
    } catch (e) {
      console.log("<><<>><><>", e);
    }
  }
  async getAllStories() {
    try {
      const res = await axios.get(VMVP_API_BASE_URL + "/story", config);

      return res;
    } catch (e) {
      console.log("<><<>><><>", e);
    }
  }
    async getAllTeamMates() {
      try {
        const res = await axios.get(VMVP_API_BASE_URL + "/team", config);
  
        return res;
      } catch (e) {
        console.log("<><<>><><>", e);
      }
    }
    async getAllSponsors() {
      try {
        const res = await axios.get(VMVP_API_BASE_URL + "/sponsors", config);
  
        return res;
      } catch (e) {
        console.log("<><<>><><>", e);
      }
    }
    async getAllRequests() {
      try {
        const res = await axios.get(VMVP_API_BASE_URL + "/sponsorRequest", config);
  
        return res;
      } catch (e) {
        console.log("<><<>><><>", e);
      }
    }
    async createStudent(data) {
      try {
        const res = await axios.post(VMVP_API_BASE_URL + "/students",data, config);
  
        return res;
      } catch (e) {
        console.log("<><<>><><>", e);
      }
    }
    async createTeam(data) {
      try {
        const res = await axios.post(VMVP_API_BASE_URL + "/team",data, config);
  
        return res;
      } catch (e) {
        console.log("<><<>><><>", e);
      }
    }
    async createSponsor(id,data) {
      try {
        const res = await axios.post(VMVP_API_BASE_URL + "/sponsors/create/"+id,data, config);
  
        return res;
      } catch (e) {
        console.log("<><<>><><>", e);
      }
    }
    async createStory(data) {
      try {
        const res = await axios.post(VMVP_API_BASE_URL + "/story",data, config);
  
        return res;
      } catch (e) {
        console.log("<><<>><><>", e);
      }
    }
    async updateRequest(id,data) {
      try {
        const res = await axios.patch(VMVP_API_BASE_URL + "/sponsorRequest/update/"+id,data, config);
  
        return res;
      } catch (e) {
        console.log("<><<>><><>", e);
      }
    }
    async updateStudent(id,data) {
      try {
        const res = await axios.put(VMVP_API_BASE_URL + "/students/"+id,data, config);
  
        return res;
      } catch (e) {
        console.log("<><<>><><>", e);
      }
    }
    async updateTeamMate(id,data) {
      try {
        const res = await axios.patch(VMVP_API_BASE_URL + "/team/"+id,data, config);
  
        return res;
      } catch (e) {
        console.log("<><<>><><>", e);
      }
    }
}

export default new VmvpApis();
