package cn.qiuxiang.react.geolocation;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

@SuppressWarnings("unused")
public class AMapGeolocationModule extends ReactContextBaseJavaModule implements AMapLocationListener {
    private ReactApplicationContext reactContext;
    private DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter;
    private AMapLocationClient client;
    private AMapLocationClientOption option = new AMapLocationClientOption();

    AMapGeolocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AMapGeolocation";
    }

    @Override
    public void onLocationChanged(AMapLocation location) {
        if (location != null) {
            eventEmitter.emit("AMapGeolocation", toJSON(location));
        }
    }

    @ReactMethod
    public void init(String key, Promise promise) {
        if (client != null) {
            client.onDestroy();
        }
        AMapLocationClient.setApiKey(key);
        AMapLocationClient.updatePrivacyAgree(this.reactContext, true);
        AMapLocationClient.updatePrivacyShow(this.reactContext, true, true);
        try {
            client = new AMapLocationClient(reactContext);
            client.setLocationListener(this);
            eventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
            promise.resolve(null);
        } catch (Exception ex) {
            promise.reject("10001", "初始化失败");
        }

    }

    @ReactMethod
    public void start() {
        option.setOnceLocation(false);
        client.setLocationOption(option);
        client.startLocation();
    }

    @ReactMethod
    public void stop() {
        client.stopLocation();
    }

    /***
     * 获取一次定位结果
     */
    @ReactMethod
    public void requestOnceLocation() {
        option.setOnceLocation(true);
        client.setLocationOption(option);
        client.startLocation();
    }

    @ReactMethod
    public void isStarted(Promise promise) {
        promise.resolve(client.isStarted());
    }

    @ReactMethod
    public void getLastKnownLocation(Promise promise) {
        promise.resolve(toJSON(client.getLastKnownLocation()));
    }

    @ReactMethod
    public void setOnceLocation(boolean value) {
        option.setOnceLocation(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setWifiScan(boolean value) {
        option.setWifiScan(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setInterval(int interval) {
        option.setInterval(interval);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setSensorEnable(boolean value) {
        option.setSensorEnable(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setOpenAlwaysScanWifi(boolean value) {
        AMapLocationClientOption.setOpenAlwaysScanWifi(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setNeedAddress(boolean value) {
        option.setNeedAddress(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setOnceLocationLatest(boolean value) {
        option.setOnceLocationLatest(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setMockEnable(boolean value) {
        option.setMockEnable(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setLocationCacheEnable(boolean value) {
        option.setLocationCacheEnable(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setGpsFirst(boolean value) {
        option.setGpsFirst(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setHttpTimeout(int value) {
        option.setHttpTimeOut(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setGpsFirstTimeout(int value) {
        option.setGpsFirstTimeout(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setLocationMode(String mode) {
        option.setLocationMode(AMapLocationClientOption.AMapLocationMode.valueOf(mode));
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setLocationPurpose(String purpose) {
        option.setLocationPurpose(AMapLocationClientOption.AMapLocationPurpose.valueOf(purpose));
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setGeoLanguage(String language) {
        option.setGeoLanguage(AMapLocationClientOption.GeoLanguage.valueOf(language));
        client.setLocationOption(option);
    }

    private ReadableMap toJSON(AMapLocation location) {
        if (location == null) {
            return null;
        }
        WritableMap map = Arguments.createMap();
        map.putInt("errorCode", location.getErrorCode());
        map.putString("errorInfo", location.getErrorInfo());
        map.putString("locationDetail", location.getLocationDetail());
        if (location.getErrorCode() == AMapLocation.LOCATION_SUCCESS) {
            map.putDouble("timestamp", location.getTime());
            map.putDouble("accuracy", location.getAccuracy());
            map.putDouble("latitude", location.getLatitude());
            map.putDouble("longitude", location.getLongitude());
            map.putDouble("altitude", location.getAltitude());
            map.putDouble("speed", location.getSpeed());
            map.putDouble("heading", location.getBearing());
            map.putInt("locationType", location.getLocationType());
            map.putString("coordinateType", location.getCoordType());
            map.putInt("gpsAccuracy", location.getGpsAccuracyStatus());
            map.putInt("trustedLevel", location.getTrustedLevel());
            if (!location.getAddress().isEmpty()) {
                WritableMap address = Arguments.createMap();
                address.putString("address", location.getAddress());
                address.putString("description", location.getDescription());
                address.putString("poiName", location.getPoiName());
                address.putString("country", location.getCountry());
                address.putString("province", location.getProvince());
                address.putString("city", location.getCity());
                address.putString("cityCode", location.getCityCode());
                address.putString("district", location.getDistrict());
                address.putString("street", location.getStreet());
                address.putString("streetNumber", location.getStreetNum());
                address.putString("adCode", location.getAdCode());
                map.putMap("regeo", address);
            }
        }
        return map;
    }
}
