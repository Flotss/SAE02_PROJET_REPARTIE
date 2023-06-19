package app.proxy;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.rmi.RemoteException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

public class ServiceProxyBlocage implements ServiceProxyBlocageInterface {


    public String makeRequest(String url) throws RemoteException {
        try {
            // Ajout du protocole à l'URL
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = "http://" + url;
            }

            // Si l'URL utilise HTTPS, on ajoute le certificat à la liste des certificats de confiance
                SSLContext sslContext = SSLContext.getInstance("TLS");
                sslContext.init(null, new TrustManager[]{new X509TrustManager() {
                    public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                    }

                    public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                    }

                    public X509Certificate[] getAcceptedIssuers() {
                        return new X509Certificate[0];
                    }
                }}, new java.security.SecureRandom());
                HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());

                // Ajout du certificat de confiance
                HttpsURLConnection.setDefaultHostnameVerifier((hostname, session) -> true);


            // Création de l'objet URL à partir de l'URL spécifiée
            URL urlObject = new URL(url);

            // Ouverture de la connexion HTTP
            HttpURLConnection connection = (HttpURLConnection) urlObject.openConnection();

            // Spécification de la méthode de requête (GET dans ce cas)
            connection.setRequestMethod("GET");


            // Lecture de la réponse de la requête
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            StringBuilder response = new StringBuilder();

            while ((line = reader.readLine()) != null) {
                response.append(line);
            }

            // Fermeture des ressources
            reader.close();
            connection.disconnect();

            // Envoi de la réponse
            int code = connection.getResponseCode();
            String status = (code == 200) ? "OK" : "ERROR";


            return "{ \"status\": \"" + status + "\", \"code\": " + code + ", \"response\": " + response.toString() + " }";
        } catch (IOException e) {
            System.out.println("Erreur lors de la requête HTTP: \n" + e.getMessage());
            return "{ status: \"ERROR\", code: 500, response: \"Erreur lors de la requête HTTP : " + e.getMessage() + "\" }";
        } catch (Exception e) {
            System.out.println("Erreur lors de l'ajout du certificat de confiance: \n" + e.getMessage());
            return "{ status: \"ERROR\", code: 500, response: \"Erreur lors de l'ajout du certificat de confiance : " + e.getMessage() + "\" }";
        }
    }
}
