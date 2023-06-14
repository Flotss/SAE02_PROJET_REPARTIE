import netscape.javascript.JSObject;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.sql.SQLException;

public interface ServiceRestaurantInterface extends Remote {
    public String getCoordonnees() throws RemoteException, SQLException;

    public String reserverResto(String nomResto, String nom, String prenom, String nb, String tel) throws RemoteException;
}