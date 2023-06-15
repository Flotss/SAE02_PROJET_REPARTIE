package app.proxy;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface ServiceProxyBlocageInterface extends Remote {
    String makeRequest(String url) throws RemoteException;
}
