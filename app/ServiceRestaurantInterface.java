import netscape.javascript.JSObject;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface ServiceRestaurantInterface extends Remote {
    public JSObject getCoordonnes() throws RemoteException;

    public void reserverResto(String nomResto, String nom, String prenom, String nb, String tel) throws RemoteException;
}