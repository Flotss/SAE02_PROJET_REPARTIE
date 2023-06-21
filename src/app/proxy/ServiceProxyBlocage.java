package app.proxy;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.ProxySelector;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.rmi.RemoteException;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

public class ServiceProxyBlocage implements ServiceProxyBlocageInterface {

    public String makeRequest(String url) throws RemoteException {
        System.out.println(url);
        try {
            ProxySelector proxySelector = ProxySelector
                    .of(new InetSocketAddress("www-cache.iutnc.univ-lorraine.fr", 3128));
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, new TrustManager[] { new X509TrustManager() {
                public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                }

                public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                }

                public X509Certificate[] getAcceptedIssuers() {
                    return new X509Certificate[0];
                }
            } }, new SecureRandom());
            HttpClient client = HttpClient.newBuilder()
                    .proxy(proxySelector)
                    .sslContext(sslContext)
                    .build();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Origin", "https://webetu.iutnc.univ-lorraine.fr")
                    .build();
            HttpResponse response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Requête HTTP envoyée à " + url);

            System.out.println(response.body());
            System.out.println("response = " + response);


// Envoi de la réponse
            int code = response.statusCode();
            String status = (code == 200) ? "OK" : "ERROR";

            return "{ \"status\": \"" + status + "\", \"code\": " + code + ", \"response\": " + response.body() + " }";
        } catch (IOException e) {
            System.out.println("Erreur lors de la requête HTTP: \n" + e.getMessage());
            return "{ status: \"ERROR\", code: 500, response: \"Erreur lors de la requête HTTP : " + e.getMessage()
                    + "\" }";
        } catch (Exception e) {
            System.out.println("Erreur lors de l'ajout du certificat de confiance: \n" + e.getMessage());
            return "{ status: \"ERROR\", code: 500, response: \"Erreur lors de l'ajout du certificat de confiance : "
                    + e.getMessage() + "\" }";
        }
    }
}