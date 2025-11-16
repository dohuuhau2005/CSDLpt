/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package csdlpt;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONObject;
import java.util.Base64;

/**
 *
 * @author dhhsv
 */
class AuthService {

    public static JSONObject getUserInfo(String token) {
        try {
            String[] parts = token.split("\\.");
            String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
            JSONObject obj = new JSONObject(payload);
            String maNV = obj.getString("id");
            System.out.println(maNV);
            URL url = new URL("http://localhost:9999/staff/allInformation?maNV=" + maNV); // API lấy user info
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            // Thêm token nếu backend dùng JWT
            conn.setRequestProperty("Authorization", token);

            int resCode = conn.getResponseCode();
            if (resCode == 200) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder sb = new StringBuilder();
                String line;

                while ((line = reader.readLine()) != null) {
                    sb.append(line);
                }
                reader.close();
                return new JSONObject(sb.toString());
            } else {
                System.out.println("Lỗi server: " + resCode);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
