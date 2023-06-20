package app.restaurant.Service;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.sql.SQLException;

public class LancerService {
    public static void main(String[] args) throws SQLException, RemoteException {
        int port = (args.length < 1) ? 10002 : Integer.parseInt(args[0]);

        if (port > 1) {
            System.out.println("Usage: java LancerService <port>");
            System.exit(1);
        }

        ServiceRestaurant serviceRestaurant = new ServiceRestaurant();
        Remote rd = UnicastRemoteObject.exportObject(serviceRestaurant, 0);

        Registry reg = LocateRegistry.createRegistry(port);
        reg.rebind("ServiceRestaurant", rd);

        System.out.println("Service enregistré : ServiceRestaurant");
    }
}
