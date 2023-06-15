package app;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.sql.SQLException;

public interface ServiceRestaurantInterface extends Remote {
    public String getCoordonnees() throws RemoteException, SQLException;

    public void reserverResto(String idRestaurant, String nom, String prenom, String nb, String tel) throws RemoteException;
}