package com.ivy;

import com.iritech.iddk.android.*;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by ckylee on 2/11/18.
 */

public class IritechModule extends ReactContextBaseJavaModule {
    public IritechModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "IritechModule";
    }

//    @ReactMethod
//    public void alert(String message) {
//        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_LONG).show();
//    }
}
