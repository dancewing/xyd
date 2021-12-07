#import <AMapFoundationKit/AMapFoundationKit.h>
#import <AMapLocationKit/AMapLocationKit.h>
#import <React/RCTEventEmitter.h>

#if __has_include("RCTEventDispatcher.h")
#import "RCTEventDispatcher.h"
#else
#import <React/RCTEventDispatcher.h>
#endif

@interface AMapGeolocation
    : RCTEventEmitter <RCTBridgeModule, AMapLocationManagerDelegate>
@end

@implementation AMapGeolocation {
  AMapLocationManager *_manager;
}

RCT_EXPORT_MODULE(AMapGeolocation)

RCT_REMAP_METHOD(init, initWithKey
                 : (NSString *)key
                 : (RCTPromiseResolveBlock)resolve
                 : (RCTPromiseRejectBlock)reject) {
  dispatch_async(dispatch_get_main_queue(), ^{
    [AMapServices sharedServices].apiKey = key;
    if (!(self->_manager)) {
      self->_manager = [[AMapLocationManager alloc] init];
      self->_manager.delegate = self;
      self->_manager.allowsBackgroundLocationUpdates = true;
     // self->_manager.up = true;
    }
    resolve(nil);
  });
}

RCT_EXPORT_METHOD(start) { [_manager startUpdatingLocation]; }

RCT_EXPORT_METHOD(stop) { [_manager stopUpdatingLocation]; }

RCT_EXPORT_METHOD(setLocatingWithReGeocode : (BOOL)value) {
  _manager.locatingWithReGeocode = value;
}

RCT_EXPORT_METHOD(setAllowsBackgroundLocationUpdates : (BOOL)value) {
  _manager.allowsBackgroundLocationUpdates = value;
}

RCT_EXPORT_METHOD(setPausesLocationUpdatesAutomatically : (BOOL)value) {
  _manager.pausesLocationUpdatesAutomatically = value;
}

RCT_EXPORT_METHOD(setDesiredAccuracy : (CLLocationAccuracy)value) {
  _manager.desiredAccuracy = value;
}

RCT_EXPORT_METHOD(setDistanceFilter : (int)value) {
  _manager.distanceFilter = value;
}

RCT_EXPORT_METHOD(setGeoLanguage : (int)value) {
  _manager.reGeocodeLanguage = (AMapLocationReGeocodeLanguage)value;
}

RCT_EXPORT_METHOD(setReGeocodeTimeout : (int)value) {
  _manager.reGeocodeTimeout = value;
}

RCT_EXPORT_METHOD(setLocationTimeout : (int)value) {
  _manager.locationTimeout = value;
}

RCT_EXPORT_METHOD(requestAuthorization: (NSString *)_level success:(RCTResponseSenderBlock)success failure:(RCTResponseSenderBlock)failure) {
    [self checkPlistKeys: _level];
}

RCT_EXPORT_METHOD(requestOnceLocation) {
    
    [_manager setDesiredAccuracy:kCLLocationAccuracyHundredMeters];
    
    [_manager requestLocationWithReGeocode:(YES) completionBlock:^(CLLocation *location, AMapLocationReGeocode *regeocode, NSError *error) {
        if (error) {
            NSLog(@"locError:{%ld - %@};", (long)error.code, error.localizedDescription);
            id errorJson = [self error:error];
            [self sendEventWithName:@"AMapGeolocation" body:errorJson];
            return;
        }
        NSLog(@"location:%@", location);
        if (regeocode)
        {
            NSLog(@"reGeocode:%@", regeocode);
        }
        if (location){
            id json = [self json:location reGeocode:regeocode];
            [self sendEventWithName:@"AMapGeolocation" body:json];
        }
    }];
}

- (void)checkPlistKeys: (NSString *)authorizationLevel {
    
}

- (id)error:(NSError *) error {
    return @{
        @"errorCode": @(error.code),
        @"errorInfo": error.localizedDescription
    };
}

- (id)json:(CLLocation *)location reGeocode:(AMapLocationReGeocode *)reGeocode {
  if (reGeocode) {
    return @{
      @"errorCode" : @(0),
      @"accuracy" : @(location.horizontalAccuracy),
      @"latitude" : @(location.coordinate.latitude),
      @"longitude" : @(location.coordinate.longitude),
      @"altitude" : @(location.altitude),
      @"speed" : @(location.speed),
      @"heading" : @(location.course),
      @"timestamp" : @(location.timestamp.timeIntervalSince1970 * 1000),
      @"regeo": @{
          @"address" : reGeocode.formattedAddress ? reGeocode.formattedAddress
                                                  : @"",
          @"poiName" : reGeocode.POIName ? reGeocode.POIName : @"",
          @"country" : reGeocode.country ? reGeocode.country : @"",
          @"province" : reGeocode.province ? reGeocode.province : @"",
          @"city" : reGeocode.city ? reGeocode.city : @"",
          @"cityCode" : reGeocode.citycode ? reGeocode.citycode : @"",
          @"district" : reGeocode.district ? reGeocode.district : @"",
          @"street" : reGeocode.street ? reGeocode.street : @"",
          @"streetNumber" : reGeocode.number ? reGeocode.number : @"",
          @"adCode" : reGeocode.adcode ? reGeocode.adcode : @"",
      }
    };
  } else {
    return @{
      @"errorCode" : @(0),
      @"accuracy" : @(location.horizontalAccuracy),
      @"latitude" : @(location.coordinate.latitude),
      @"longitude" : @(location.coordinate.longitude),
      @"altitude" : @(location.altitude),
      @"speed" : @(location.speed),
      @"direction" : @(location.course),
      @"timestamp" : @(location.timestamp.timeIntervalSince1970 * 1000),
    };
  }
}

- (void)amapLocationManager:(AMapLocationManager *)manager
          didUpdateLocation:(CLLocation *)location
                  reGeocode:(AMapLocationReGeocode *)reGeocode {
  id json = [self json:location reGeocode:reGeocode];
  [self sendEventWithName:@"AMapGeolocation" body:json];
}

- (void)amapLocationManager:(AMapLocationManager *)manager
           didFailWithError:(NSError *)error {
  [self sendEventWithName:@"AMapGeolocation"
                     body:@{
                       @"errorCode" : @(error.code),
                       @"errorInfo" : error.localizedDescription,
                     }];
}

- (void)amapLocationManager:(AMapLocationManager *)manager
      doRequireLocationAuth:(CLLocationManager *)locationManager {
  [locationManager requestAlwaysAuthorization];
}

- (NSArray<NSString *> *)supportedEvents {
  return @[ @"AMapGeolocation" ];
}

@end
