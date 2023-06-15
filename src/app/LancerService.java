package app;

import app.proxy.ServiceProxyBlocage;
import app.proxy.ServiceProxyBlocageInterface;
import app.restaurant.ServiceRestaurant;
import app.restaurant.ServiceRestaurantInterface;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.sql.SQLException;

public class LancerService {
    public static void start(int... ports) {
        try {

            ServiceRestaurant serviceRestaurant = new ServiceRestaurant(); /* Créer une instance de Compteur */
            ServiceRestaurantInterface rd = (ServiceRestaurantInterface) UnicastRemoteObject.exportObject(serviceRestaurant, 0);

            ServiceProxyBlocageInterface rdProxy = (ServiceProxyBlocageInterface) UnicastRemoteObject.exportObject(new ServiceProxyBlocage(), 0);

            /* Un_port = un entier particulier ou 0 pour auto-assigné */
            try {

                int port = 6789;                      // le port de la rmiregistry par défaut
                if (ports.length > 0) {
                    port = ports[0];
                }
                Registry reg = LocateRegistry.createRegistry(port); /* Création de l'annuaire */
                System.out.println(reg);

                registerRemote(reg, rd, "ServiceRestaurant");
                registerRemote(reg, rdProxy, "ServiceProxyBlocage");

            } catch (RemoteException e) {
                System.out.println("Impossible de creer le registry: \n" + e.getMessage());
            }
        } catch (RemoteException e) {
            System.out.println("Erreur d'exportation du service: \n" + e.getMessage());
        } catch (SQLException e) {
            System.out.println("Erreur de base de données: \n" + e.getMessage());
        }
    }


    private static void registerRemote(Registry reg, Remote remote, String name) {
        try {
            reg.rebind(name, remote);
            System.out.println("Service " + name + " enregistré");
        } catch (RemoteException e) {
            System.out.println("Impossible d'enregistrer la reference: \n" + e.getMessage());
        }
    }
}