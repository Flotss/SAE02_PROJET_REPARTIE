import netscape.javascript.JSObject;

import java.rmi.RemoteException;
import java.rmi.server.RemoteServer;
import java.rmi.server.ServerNotActiveException;
import java.util.HashMap;
import java.util.Map;

//Service
public class ServiceRestaurant implements ServiceRestaurantInterface
{

   @Override
   public JSObject getCoordonnes() throws RemoteException {
      // Récupération dans une base de données
      //Conversion en json et return
      return null;
   }

   @Override
   public void reserverResto(String nomResto, String nom, String prenom, String nb, String tel) throws RemoteException {

   }
}