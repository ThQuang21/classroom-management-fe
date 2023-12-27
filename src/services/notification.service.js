import http from "./http-config";

// const API_URL = "https://classroom-management-be.vercel.app/";
const API_URL = "http://localhost:3000/";

const createNotification = async ({ senderId, receiverIds, classCode, type, message }) => {
  return await http.post(API_URL + "notifications", {
    senderId, receiverIds, classCode, type, message
  });
};

const NotificationService = {
  createNotification,

}

export default NotificationService;