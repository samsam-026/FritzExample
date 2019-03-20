package com.fritzexample;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.*;
import java.io.*;
import android.graphics.*;

import ai.fritz.fritzvisionstylepaintings.PaintingStyles;
import ai.fritz.vision.styletransfer.*;
import ai.fritz.core.FritzOnDeviceModel;
import ai.fritz.vision.*;

public class FritzStyleModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public FritzStyleModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "FritzStyle";
    }

    @ReactMethod
    public void getNewImage(String image, String filter, Callback errorCallback, Callback successCallback) {

        try {

            // Get the style of painting the user wishes to convert the image into.

            FritzOnDeviceModel styleOnDeviceModel;

            switch (filter) {
            case "STARRY_NIGHT":
                styleOnDeviceModel = PaintingStyles.STARRY_NIGHT;
                break;
            case "BICENTENNIAL_PRINT":
                styleOnDeviceModel = PaintingStyles.BICENTENNIAL_PRINT;
                break;
            case "FEMMES":
                styleOnDeviceModel = PaintingStyles.FEMMES;
                break;
            case "HEAD_OF_CLOWN":
                styleOnDeviceModel = PaintingStyles.HEAD_OF_CLOWN;
                break;
            case "HORSES_ON_SEASHORE":
                styleOnDeviceModel = PaintingStyles.HORSES_ON_SEASHORE;
                break;
            case "KALEIDOSCOPE":
                styleOnDeviceModel = PaintingStyles.KALEIDOSCOPE;
                break;
            case "PINK_BLUE_RHOMBUS":
                styleOnDeviceModel = PaintingStyles.PINK_BLUE_RHOMBUS;
                break;
            case "POPPY_FIELD":
                styleOnDeviceModel = PaintingStyles.POPPY_FIELD;
                break;
            case "RITMO_PLASTICO":
                styleOnDeviceModel = PaintingStyles.RITMO_PLASTICO;
                break;
            case "THE_SCREAM":
                styleOnDeviceModel = PaintingStyles.THE_SCREAM;
                break;
            case "THE_TRAIL":
                styleOnDeviceModel = PaintingStyles.THE_TRAIL;
                break;
            default:
                styleOnDeviceModel = PaintingStyles.THE_TRAIL;
                break;
            }

            // Initialize the style Predictor with the selected artwork style.
            FritzVisionStylePredictor stylePredictor = FritzVision.StyleTransfer.getPredictor(styleOnDeviceModel);

            // Get the Base 64 encoder and decoder.
            Base64.Decoder decoder = Base64.getDecoder();
            Base64.Encoder encoder = Base64.getEncoder();

            // Decode the base 64 image into an array of bytes.
            byte[] decodedString = decoder.decode(image);

            // Convert the byte array into an Bitmap image from the beginning (0) to the end
            // (decodedString.length) of the array.
            Bitmap bitmap = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);

            // A standard input class for the style Predictor.
            FritzVisionImage visionImage = FritzVisionImage.fromBitmap(bitmap);

            // Convert the normal image into a styled image according to the selected
            // artwork style.
            FritzVisionStyleResult styleResult = stylePredictor.predict(visionImage);

            // Get a Bitmap image from the styled Result.
            Bitmap styledBitmap = styleResult.getResultBitmap();

            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            // Compress the Bitmap image into a .png image and add it to the output stream
            // baos.
            styledBitmap.compress(Bitmap.CompressFormat.PNG, 0, baos);

            // Convert the output stream into a byte array.
            byte[] b = baos.toByteArray();

            // Encode the byte array into a base 64 image.
            String newImage = encoder.encodeToString(b);

            // Send the styled images' base 64 string through the success callback to the
            // Javascript side.
            successCallback.invoke(newImage);

        } catch (Exception e) {

            errorCallback.invoke(e.getMessage());

        }

    }

}