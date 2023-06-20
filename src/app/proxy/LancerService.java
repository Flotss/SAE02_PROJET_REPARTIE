package app.proxy;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.sql.SQLException;

public class LancerService {
    public static void main(String[] args) throws SQLException, RemoteException {
        int port = (args.length < 1) ? 10001 : Integer.parseInt(args[0]);

        if (port > 1) {
            System.out.println("Usage: java LancerService <port>");
            System.exit(1);
        }


        ServiceProxyBlocage serviceProxyBlocage = new ServiceProxyBlocage();
        Remote rd = UnicastRemoteObject.exportObject(serviceProxyBlocage, 0);

        Registry reg = LocateRegistry.createRegistry(port);
        reg.rebind("ServiceProxyBlocage", rd);

        System.out.println("Service enregistré : ServiceProxyBlocage");
    }
}
