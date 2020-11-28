import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

//export default async function getCameraPermissions() {
//    if (Constants.platform.android) {
//      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//
//      if (status != "granted") {
//        alert("Permissão para acessar sua câmera");
//      }
//    }
//  };

class UserPermissions {
    getCameraPermissions = async () => {
        if (Constants.platform.android) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
          if (status != "granted") {
            alert("Permissão para acessar sua câmera");
          }
        }
      };
  } 

  export default new UserPermissions();