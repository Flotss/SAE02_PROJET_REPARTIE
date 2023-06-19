package app.restaurant.Service;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.sql.SQLException;

public interface ServiceRestaurantInterface extends Remote {
    String getCoordonnees() throws RemoteException, SQLException;

    String makeReservation(String idRestaurant, String nom, String prenom, String nb, String tel) throws RemoteException;

    String addRestaurant(String nom, String adresse, String gps) throws RemoteException;

    }