type Face = {
  rollAngle: number;
  pitchAngle: number;
  yawAngle: number;
  bounds: {
    top: number;
    left: number;
    height: number;
    width: number;
  };
  trackingId: number;
};

export default Face;