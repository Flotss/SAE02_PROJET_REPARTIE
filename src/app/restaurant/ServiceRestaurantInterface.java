package app.restaurant;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.sql.SQLException;

public interface ServiceRestaurantInterface extends Remote {
    String getCoordonnees() throws RemoteException, SQLException;

    void reserverResto(String idRestaurant, String nom, String prenom, String nb, String tel) throws RemoteException;
}