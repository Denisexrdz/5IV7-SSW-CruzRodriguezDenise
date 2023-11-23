/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsa_crdenise;

import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.math.BigInteger;
import java.security.*;
import java.security.interfaces.RSAPublicKey;
import javax.crypto.Cipher;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

public class RSA_CRDenise {
    private static final String BC = BouncyCastleProvider.PROVIDER_NAME;

    public static void main(String[] args) throws Exception {
        // Instalar el proveedor Bouncy Castle
        if (Security.getProvider(BC) == null) {
            Security.addProvider(new BouncyCastleProvider());
        }

        // Crear una nueva clave pública y privada
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA", BC);
        keyPairGenerator.initialize(2048);
        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        
        SecureRandom[] secureRandom = new SecureRandom[1];
if (keyPair.getPublic() instanceof RSAPublicKey) {
    RSAPublicKey rsaPublicKey = (RSAPublicKey) keyPair.getPublic();
    byte[] seed = new byte[256 / 8];
    byte[] modulusBytes = rsaPublicKey.getModulus().toByteArray();
    System.arraycopy(modulusBytes, modulusBytes.length - seed.length, seed, 0, seed.length);

    secureRandom[0] = new SecureRandom(seed);
}
            

        // Crear el interfaz gráfico de usuario
        JFrame frame = new JFrame("RSA Encryption");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 300);

        JPanel panel = new JPanel(new GridBagLayout());
        frame.add(panel);

        GridBagConstraints constraints = new GridBagConstraints();
        constraints.anchor = GridBagConstraints.WEST;
        constraints.insets = new Insets(10, 10, 10, 10);

        constraints.gridx = 0;
        constraints.gridy = 0;
        panel.add(new JLabel("Primer número primo (p):"), constraints);

        constraints.gridx = 1;
        panel.add(new JTextField(20), constraints);

        constraints.gridx = 0;
        constraints.gridy = 1;
        panel.add(new JLabel("Segundo número primo (q):"), constraints);

        constraints.gridx = 1;
        panel.add(new JTextField(20), constraints);

        constraints.gridx = 0;
        constraints.gridy = 2;
        panel.add(new JLabel("Mensaje que desea cifrar:"), constraints);

        constraints.gridx = 1;
        panel.add(new JTextField(20), constraints);

        constraints.gridx = 0;
        constraints.gridy = 3;
        constraints.gridwidth = 2;
        constraints.anchor = GridBagConstraints.CENTER;
        JButton encryptButton = new JButton("Cifrar mensaje");
        panel.add(encryptButton, constraints);

        encryptButton.addActionListener(new ActionListener() {
        @Override
        public void actionPerformed(ActionEvent e) {
            // Cifrar el mensaje con la clave pública eficientemente
            Cipher encryptCipher = null;
            try {
                encryptCipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-1AndMGF1Padding", BC);
                encryptCipher.init(Cipher.ENCRYPT_MODE, keyPair.getPublic(), secureRandom[0]);
            } catch (Exception ex) {
                ex.printStackTrace();
            }

            JTextField textField = (JTextField) panel.getComponent(3);
            String message = textField.getText();
            byte[] encryptedMessage = new byte[0];
            try {
                encryptedMessage = encryptCipher.doFinal(message.getBytes());
            } catch (Exception ex) {
                ex.printStackTrace();
            }


                    // Mostrar el mensaje cifrado
                    JOptionPane.showMessageDialog(frame, "El mensaje cifrado es: " + new BigInteger(1, encryptedMessage));
                }
            });

        frame.setVisible(true);
        
        
    }
}
