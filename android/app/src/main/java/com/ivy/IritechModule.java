package com.ivy;

import android.app.Activity;
import android.content.Context;
import android.content.res.Resources;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.iritech.iddk.android.*;

import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.UUID;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

import static android.os.ParcelFileDescriptor.MODE_APPEND;

/**
 * Created by ckylee on 2/11/18.
 */

public class IritechModule extends ReactContextBaseJavaModule {

    public final static String TAG = IritechModule.class.getSimpleName();

    private IddkConfig iddkConfig;
    //set in function that is calling instance using setApi
    private static Iddk2000Apis iddkApi;
    private static IritechModule patientIdentifier;
    private ArrayList<String> connectedDevices;
    private HIRICAMM mDeviceHandle;
    private IddkCaptureStatus mCaptureStatus;
    private IddkResult mRes;
    private CaptureProc mCaptureProc;
    private static ReactApplicationContext mContext;

    private IddkTemplateInfo mTemplateInfo;

    public static boolean isNewPatient;
    public static String newPatientName;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public IritechModule(ReactApplicationContext reactContext) {
        super(reactContext);

        iddkConfig = new IddkConfig();
        iddkConfig.setCommStd(IddkCommStd.IDDK_COMM_USB);
        iddkConfig.setResetOnOpenDevice(true);
        iddkConfig.setEnableLog(false);
        mCaptureStatus = new IddkCaptureStatus();


        if (iddkApi.getSdkConfig(iddkConfig).getValue() == IddkResult.IDDK_OK) {
            if (iddkConfig.getCommStd().getValue() == IddkCommStd.IDDK_COMM_USB) {
                Log.d(TAG, "USB Comm being used for iris cam communication");
            } else {
                iddkConfig.setCommStd(IddkCommStd.IDDK_COMM_USB);
                iddkApi.setSdkConfig(iddkConfig);
            }
        }

        iddkApi = Iddk2000Apis.getInstance(reactContext);
    }


    @Override
    public String getName() {
        return "IritechModule";
    }


    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(TAG, IritechModule.class.getSimpleName());
        return constants;
    }

    @ReactMethod
    public void scanIris() {

    }

    @ReactMethod
    public boolean scanningDone() {

    }

    @ReactMethod
    public String patientID (){

    }

    //error messages



    public boolean isDeviceConnected() {
        mDeviceHandle = new HIRICAMM();

        connectedDevices = new ArrayList<String>();

        //check if any devices currently connected
        IddkResult result = iddkApi.scanDevices(connectedDevices);

        if (result.getValue() == IddkResult.IDDK_OK) {
            for (int i = 0; i < connectedDevices.size(); i++) {
                Log.d(TAG, "Device found: " + connectedDevices.get(i));
            }

            return true;
        }
        return false;
    }

    public String identifyIris () {
        System.out.println(mDeviceHandle.getHandle());
        mRes = iddkApi.openDevice(connectedDevices.get(0), mDeviceHandle);

        if (mRes.getValue() == IddkResult.IDDK_OK || mRes.getValue() == IddkResult.IDDK_DEVICE_ALREADY_OPEN) {
            mRes = iddkApi.initCamera(mDeviceHandle, new IddkInteger(), new IddkInteger());

            if (mRes.getValue() == IddkResult.IDDK_OK) {

                mCaptureProc = new CaptureProc();

                Log.d(TAG, "Capturing process started");

                mRes = iddkApi.startCapture(
                        mDeviceHandle,
                        new IddkCaptureMode(IddkCaptureMode.IDDK_TIMEBASED),
                        3,
                        new IddkQualityMode(IddkQualityMode.IDDK_QUALITY_HIGH),
                        new IddkCaptureOperationMode(IddkCaptureOperationMode.IDDK_AUTO_CAPTURE),
                        new IddkEyeSubType(IddkEyeSubType.IDDK_UNKNOWN_EYE),
                        true,
                        mCaptureProc);

                if (mRes.getValue() == IddkResult.IDDK_OK) {
                    Log.d(TAG, "Invoke successfully called in captureProc");

                    if(mCaptureProc.getStatus()){
                        if(mCaptureProc.getResult()){
                            return mCaptureProc.getEnrolleeId();
                        }
                        return "none_found";
                    }

                    return "none_found";
                } else {
                    Log.e(TAG, "Error when calling invoke in CaptureProc");
                    Log.e(TAG, mRes.toString());
                    return "none_found";
                }

            } else if (mRes.getValue() == IddkResult.IDDK_DEV_IO_FAILED || mRes.getValue() == IddkResult.IDDK_DEVICE_IO_FAILED) {
                Log.e(TAG, "Unable to initialize camera");

                //mRes = iddkApi.recovery(mDeviceHandle, new IddkRecoveryCode(IddkRecoveryCode.IDDK_SOFT_RESET));
                return "none_found";
            } else if (mRes.getValue() == IddkResult.IDDK_DEV_OUTOFMEMORY) {
                Log.e(TAG, "Unable to init, device out of memory");
                return "none_found";
            } else {
                return "none_found";
            }

        } else if (mRes.getValue() == IddkResult.IDDK_VERSION_INCOMPATIBLE || mRes.getValue() == IddkResult.IDDK_DEVICE_OPEN_FAILED) {
            iddkApi.closeDevice(mDeviceHandle);
            Log.e(TAG, "Library Issue");
            return "none_found";
        } else if (mRes.getValue() == IddkResult.IDDK_MEMORY_ALLOCATION_FAILED) {
            iddkApi.closeDevice(mDeviceHandle);
            Log.e(TAG, "Memory allocation issues");
            return "none_found";
        } else if (mRes.getValue() == IddkResult.IDDK_INVALID_PARAMETER || mRes.getValue() == IddkResult.IDDK_DEVICE_NOT_FOUND) {
            iddkApi.closeDevice(mDeviceHandle);
            Log.e(TAG, "Invalid parameter or device not found");
            return "none_found";
        } else {
            iddkApi.closeDevice(mDeviceHandle);
            Log.e(TAG, "Device failed to open");
            return "none_found";
        }
    }

    public boolean enrollPerson(String enrolleeId) {

        ArrayList<String> ids = new ArrayList<String>();
        IddkInteger idsCount = new IddkInteger();
        IddkInteger numUsedSlots = new IddkInteger();
        IddkInteger numMaxSlots = new IddkInteger();

        iddkApi.loadGallery(mDeviceHandle, ids, idsCount, numUsedSlots, numMaxSlots);

        mRes = iddkApi.enrollCapture(mDeviceHandle, enrolleeId);

        if (mRes.getValue() == IddkResult.IDDK_OK) {
            Log.d(TAG, "ID enrolled successfully");
            return true;
        } else if (mRes.getValue() == IddkResult.IDDK_GAL_FULL || mRes.getValue() == IddkResult.IDDK_GAL_ID_NOT_ENOUGH_SLOT || mRes.getValue() == IddkResult.IDDK_GAL_ID_SLOT_FULL) {
            Log.e(TAG, "Gallery space issue encountered while trying to enroll");
            return false;
        } else if (mRes.getValue() == IddkResult.IDDK_SE_NO_FRAME_AVAILABLE || mRes.getValue() == IddkResult.IDDK_SE_NO_QUALIFIED_FRAME) {
            Log.e(TAG, "Capture process not finished or not yet started while trying to enroll");
            return false;
        } else if (mRes.getValue() == IddkResult.IDDK_DEV_OUTOFMEMORY) {
            Log.e(TAG, "Device out of memory when trying to enroll");
            return false;
        } else {
            Log.e(TAG, "Error while trying to enroll");
            return false;
        }
    }

    //saveIristoIrisScanner, not phone
    public boolean saveIrisToPhone() {
        ArrayList<String> idList = new ArrayList<>();
        IddkInteger numUsedSlots =  new IddkInteger();
        IddkInteger numMaxSlots = new IddkInteger();
        IddkInteger idCount = new IddkInteger();

        iddkApi.commitGallery(mDeviceHandle);
        iddkApi.loadGallery(mDeviceHandle, idList, idCount, numUsedSlots, numMaxSlots);

        ArrayList<IddkDataBuffer> templates = new ArrayList<>();
        for(int i = 0; i < idList.size(); i++) {
            IddkDataBuffer tmp = new IddkDataBuffer();
            iddkApi.getEnrolleeTemplate(mDeviceHandle, idList.get(i), tmp);
            templates.add(tmp);
        }

        try {
            FileOutputStream fou = mContext.openFileOutput("irises.ser", MODE_APPEND);
            ObjectOutputStream out = new ObjectOutputStream(fou);
            out.writeObject(templates);
            out.close();
            return true;
        }
        catch (IOException e) {
            Log.e("Exception", "File write failed: " + e.toString());
            return false;
        }
    }

    private boolean loadIrisFromPhone() {

        ArrayList<IddkDataBuffer> templates = new ArrayList<>();

        try {
            FileInputStream in = new FileInputStream("irises.ser");
            ObjectInputStream reader = new ObjectInputStream(in);
            templates = (ArrayList<IddkDataBuffer>) reader.readObject();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return false;
        } catch (IOException e) {
            e.printStackTrace();
            return  false;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return false;
        }


        return true;
    }

    public class CaptureProc implements IddkCaptureProc {

        private IddkResult mResCap;
        boolean doneScanning = false;
        private boolean success = false;
        String enrolleeId = "none";

        @Override
        public void invoke(ArrayList<IddkImage> arrayList, IddkInteger iddkInteger, IddkCaptureStatus iddkCaptureStatus, IddkResult iddkResult) {

            if (iddkResult != null) {
                /** process capture error. After this error, capturing process is aborted **/
                Log.e(TAG, "No iddkResult in CaptureProc");
                success = false;
                return;
            }

            if (iddkCaptureStatus != null) {
                if (iddkCaptureStatus.getValue() == IddkCaptureStatus.IDDK_COMPLETE) {
                    /** capture has finished. **/

                    IddkDataBuffer mDataBuffer = new IddkDataBuffer();

                    mResCap = iddkApi.getResultTemplate(mDeviceHandle, mDataBuffer);
                    if (mResCap.getValue() == IddkResult.IDDK_OK) {
                        Log.d(TAG, "Template received");
                        mResCap = iddkApi.getTemplateInfo(mDeviceHandle, mDataBuffer, mTemplateInfo);


                    } else {
                        Log.e(TAG, "Unable to get template");


                        doneScanning = true;
                        success = false;
                        return;
                    }

                    /** Check if captured iris already exists**/

                    ArrayList<String> ids = new ArrayList<String>();
                    IddkInteger idsCount = new IddkInteger();
                    IddkInteger numUsedSlots = new IddkInteger();
                    IddkInteger numMaxSlots = new IddkInteger();

                    mResCap = iddkApi.loadGallery(mDeviceHandle, ids, idsCount, numUsedSlots, numMaxSlots);
                    if (mResCap.getValue() == IddkResult.IDDK_OK) {
                        Log.d(TAG, "Gallery successfully loaded on device, number of IDs: " + Integer.toString(idsCount.getValue()));
                    } else if (mResCap.getValue() == IddkResult.IDDK_DEV_OUTOFMEMORY || mResCap.getValue() == IddkResult.IDDK_DEV_NOT_ENOUGH_MEMORY) {
                        Log.e(TAG, "Memory error in device");
                        doneScanning = true;
                        success = false;
                        return;
                    } else if (mResCap.getValue() == IddkResult.IDDK_GAL_LOAD_FAILED) {
                        Log.e(TAG, "Stored templates may have been corrupted");
                        doneScanning = true;
                        success = false;
                        return;
                    } else {
                        Log.e(TAG, "Error loading gallery");
                        doneScanning = true;
                        success = false;
                        return;
                    }

                    //start scanning iris template with existing templates
                    ArrayList<IddkComparisonResult> comparisonResults = new ArrayList<IddkComparisonResult>();
                    mResCap = iddkApi.compare1N(mDeviceHandle, 1.05f, comparisonResults);
                    String resultId = "";
                    float mindis = 4.0f;

                    if (mResCap.getValue() == IddkResult.IDDK_OK && comparisonResults.size() > 0) {

                        for (int i = 0; i < comparisonResults.size(); i++) {
                            if (mResCap.intValue() == IddkResult.IDDK_OK) {
                                if (mindis > comparisonResults.get(i).getDistance()) {
                                    mindis = comparisonResults.get(i).getDistance();
                                    resultId = comparisonResults.get(i).getEnrollId();
                                }
                            }
                        }

                        Log.d(TAG, "EnrolleeID: " + resultId);

                        enrolleeId = resultId;

                    } else if (mResCap.getValue() == IddkResult.IDDK_OK) {
                        Log.d(TAG, "Id not enrolled");
                    }

                } else if (iddkCaptureStatus.getValue() == IddkCaptureStatus.IDDK_CAPTURING) {
                    /** Eye has been detected.**/


                } else if (iddkCaptureStatus.getValue() == IddkCaptureStatus.IDDK_ABORT) {
                    /** capture has been aborted **/
                }
            }

            if (arrayList != null) {
                /** show image on its GUI control **/
                Log.e(TAG, "Images detected");
            }
        }

        public boolean getStatus() {
            return doneScanning;
        }

        public boolean getResult(){
            return success;
        }

        public String getEnrolleeId() {
            return enrolleeId;
        }

    }

}
