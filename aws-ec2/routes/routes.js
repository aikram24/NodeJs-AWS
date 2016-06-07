
var aws = require('aws-sdk');
var path = require('path');


// Exporting Routes 
module.exports = function(app) {



// Home Page
app.get('/', function(req, res){
   res.sendFile(path.join(__dirname+'/index.html'));
});


var ec2 = new aws.EC2;
app.get('/ec2', function (req, res){
  ec2.describeInstances(function(err, data) {
                    if (err)
                        console.log(err);

                      var inst_id = '-';
                    for (var i = 0; i < data.Reservations.length; i++) {
                      var reserv = data.Reservations[i];
                      var instances = reserv.Instances;

                    for (var j = 0; j < instances.length; j++) {
                      var instanceID = instances[j].InstanceId;


                      var state = instances[j].State.Code;
                      /*                        
                        0 : pending
                        16 : running
                        32 : shutting-down
                        48 : terminated
                        64 : stopping
                        80 : stopped
                        */
                      if (state = 0) {
                        state = "pending";
                      } else if (state = 16){
                        state = "running";
                      } else if (state = 32) {
                        state = "shutting-down";
                      } else if (state = 48){
                        state = "terminated";
                      } else if (state = 64){
                        state = "stopping";
                      } else if (state = 80){
                        state = "stopped";
                      } else {
                        state = "undefined";
                      }


                      var public_ip = instances[j].PublicIpAddress;
                      var private_ip = instances[j].PrivateIpAddress;
                      var imageID = instances[j].ImageId;
                      var vpc_id = instances[j].VpcId;
                 res.write('INSTANCE ID ' + instanceID + " STATE " + state 
                  + " PUBLIC IP " + public_ip + " PRIVATE IP " + private_ip 
                  + ' IMAGE ID ' + imageID + " VPC ID " + vpc_id
                  + "\n");
                        }
                    }
                  res.end();

                });

});

};











/*
Parameters:

    err (Error) —

    the error object returned from the request. Set to null if the request is successful.
    data (Object) —

    the de-serialized data returned from the request. Set to null if a request error occurs. The data object has the following properties:
        Reservations — (Array<map>)

        Zero or more reservations.
            ReservationId — (String)

            The ID of the reservation.
            OwnerId — (String)

            The ID of the AWS account that owns the reservation.
            RequesterId — (String)

            The ID of the requester that launched the instances on your behalf (for example, AWS Management Console or Auto Scaling).
            Groups — (Array<map>)

            [EC2-Classic only] One or more security groups.
                GroupName — (String)

                The name of the security group.
                GroupId — (String)

                The ID of the security group.
            Instances — (Array<map>)

            One or more instances.
                InstanceId — (String)

                The ID of the instance.
                ImageId — (String)

                The ID of the AMI used to launch the instance.
                State — (map)

                The current state of the instance.
                    Code — (Integer)

                    The low byte represents the state. The high byte is an opaque internal value and should be ignored.

                        0 : pending

                        16 : running

                        32 : shutting-down

                        48 : terminated

                        64 : stopping

                        80 : stopped
                    Name — (String)

                    The current state of the instance.
                    Possible values include:
                        "pending"
                        "running"
                        "shutting-down"
                        "terminated"
                        "stopping"
                        "stopped"
                PrivateDnsName — (String)

                The private DNS name assigned to the instance. This DNS name can only be used inside the Amazon EC2 network. This name is not available until the instance enters the running state. For EC2-VPC, this name is only available if you've enabled DNS hostnames for your VPC.
                PublicDnsName — (String)

                The public DNS name assigned to the instance. This name is not available until the instance enters the running state. For EC2-VPC, this name is only available if you've enabled DNS hostnames for your VPC.
                StateTransitionReason — (String)

                The reason for the most recent state transition. This might be an empty string.
                KeyName — (String)

                The name of the key pair, if this instance was launched with an associated key pair.
                AmiLaunchIndex — (Integer)

                The AMI launch index, which can be used to find this instance in the launch group.
                ProductCodes — (Array<map>)

                The product codes attached to this instance, if applicable.
                    ProductCodeId — (String)

                    The product code.
                    ProductCodeType — (String)

                    The type of product code.
                    Possible values include:
                        "devpay"
                        "marketplace"
                InstanceType — (String)

                The instance type.
                Possible values include:
                    "t1.micro"
                    "m1.small"
                    "m1.medium"
                    "m1.large"
                    "m1.xlarge"
                    "m3.medium"
                    "m3.large"
                    "m3.xlarge"
                    "m3.2xlarge"
                    "m4.large"
                    "m4.xlarge"
                    "m4.2xlarge"
                    "m4.4xlarge"
                    "m4.10xlarge"
                    "t2.nano"
                    "t2.micro"
                    "t2.small"
                    "t2.medium"
                    "t2.large"
                    "m2.xlarge"
                    "m2.2xlarge"
                    "m2.4xlarge"
                    "cr1.8xlarge"
                    "x1.4xlarge"
                    "x1.8xlarge"
                    "x1.16xlarge"
                    "x1.32xlarge"
                    "i2.xlarge"
                    "i2.2xlarge"
                    "i2.4xlarge"
                    "i2.8xlarge"
                    "hi1.4xlarge"
                    "hs1.8xlarge"
                    "c1.medium"
                    "c1.xlarge"
                    "c3.large"
                    "c3.xlarge"
                    "c3.2xlarge"
                    "c3.4xlarge"
                    "c3.8xlarge"
                    "c4.large"
                    "c4.xlarge"
                    "c4.2xlarge"
                    "c4.4xlarge"
                    "c4.8xlarge"
                    "cc1.4xlarge"
                    "cc2.8xlarge"
                    "g2.2xlarge"
                    "g2.8xlarge"
                    "cg1.4xlarge"
                    "r3.large"
                    "r3.xlarge"
                    "r3.2xlarge"
                    "r3.4xlarge"
                    "r3.8xlarge"
                    "d2.xlarge"
                    "d2.2xlarge"
                    "d2.4xlarge"
                    "d2.8xlarge"
                LaunchTime — (Date)

                The time the instance was launched.
                Placement — (map)

                The location where the instance launched, if applicable.
                    AvailabilityZone — (String)

                    The Availability Zone of the instance.
                    GroupName — (String)

                    The name of the placement group the instance is in (for cluster compute instances).
                    Tenancy — (String)

                    The tenancy of the instance (if the instance is running in a VPC). An instance with a tenancy of dedicated runs on single-tenant hardware. The host tenancy is not supported for the ImportInstance command.
                    Possible values include:
                        "default"
                        "dedicated"
                        "host"
                    HostId — (String)

                    The ID of the Dedicted host on which the instance resides. This parameter is not support for the ImportInstance command.
                    Affinity — (String)

                    The affinity setting for the instance on the Dedicated host. This parameter is not supported for the ImportInstance command.
                KernelId — (String)

                The kernel associated with this instance, if applicable.
                RamdiskId — (String)

                The RAM disk associated with this instance, if applicable.
                Platform — (String)

                The value is Windows for Windows instances; otherwise blank.
                Possible values include:
                    "Windows"
                Monitoring — (map)

                The monitoring information for the instance.
                    State — (String)

                    Indicates whether monitoring is enabled for the instance.
                    Possible values include:
                        "disabled"
                        "disabling"
                        "enabled"
                        "pending"
                SubnetId — (String)

                [EC2-VPC] The ID of the subnet in which the instance is running.
                VpcId — (String)

                [EC2-VPC] The ID of the VPC in which the instance is running.
                PrivateIpAddress — (String)

                The private IP address assigned to the instance.
                PublicIpAddress — (String)

                The public IP address assigned to the instance, if applicable.
                StateReason — (map)

                The reason for the most recent state transition.
                    Code — (String)

                    The reason code for the state change.
                    Message — (String)

                    The message for the state change.

                        Server.SpotInstanceTermination: A Spot instance was terminated due to an increase in the market price.

                        Server.InternalError: An internal error occurred during instance launch, resulting in termination.

                        Server.InsufficientInstanceCapacity: There was insufficient instance capacity to satisfy the launch request.

                        Client.InternalError: A client error caused the instance to terminate on launch.

                        Client.InstanceInitiatedShutdown: The instance was shut down using the shutdown -h command from the instance.

                        Client.UserInitiatedShutdown: The instance was shut down using the Amazon EC2 API.

                        Client.VolumeLimitExceeded: The limit on the number of EBS volumes or total storage was exceeded. Decrease usage or request an increase in your limits.

                        Client.InvalidSnapshot.NotFound: The specified snapshot was not found.
                Architecture — (String)

                The architecture of the image.
                Possible values include:
                    "i386"
                    "x86_64"
                RootDeviceType — (String)

                The root device type used by the AMI. The AMI can use an EBS volume or an instance store volume.
                Possible values include:
                    "ebs"
                    "instance-store"
                RootDeviceName — (String)

                The root device name (for example, /dev/sda1 or /dev/xvda).
                BlockDeviceMappings — (Array<map>)

                Any block device mapping entries for the instance.
                    DeviceName — (String)

                    The device name exposed to the instance (for example, /dev/sdh or xvdh).
                    Ebs — (map)

                    Parameters used to automatically set up EBS volumes when the instance is launched.
                        VolumeId — (String)

                        The ID of the EBS volume.
                        Status — (String)

                        The attachment state.
                        Possible values include:
                            "attaching"
                            "attached"
                            "detaching"
                            "detached"
                        AttachTime — (Date)

                        The time stamp when the attachment initiated.
                        DeleteOnTermination — (Boolean)

                        Indicates whether the volume is deleted on instance termination.
                VirtualizationType — (String)

                The virtualization type of the instance.
                Possible values include:
                    "hvm"
                    "paravirtual"
                InstanceLifecycle — (String)

                Indicates whether this is a Spot instance or a Scheduled Instance.
                Possible values include:
                    "spot"
                    "scheduled"
                SpotInstanceRequestId — (String)

                If the request is a Spot instance request, the ID of the request.
                ClientToken — (String)

                The idempotency token you provided when you launched the instance, if applicable.
                Tags — (Array<map>)

                Any tags assigned to the instance.
                    Key — (String)

                    The key of the tag.

                    Constraints: Tag keys are case-sensitive and accept a maximum of 127 Unicode characters. May not begin with aws:
                    Value — (String)

                    The value of the tag.

                    Constraints: Tag values are case-sensitive and accept a maximum of 255 Unicode characters.
                SecurityGroups — (Array<map>)

                One or more security groups for the instance.
                    GroupName — (String)

                    The name of the security group.
                    GroupId — (String)

                    The ID of the security group.
                SourceDestCheck — (Boolean)

                Specifies whether to enable an instance launched in a VPC to perform NAT. This controls whether source/destination checking is enabled on the instance. A value of true means checking is enabled, and false means checking is disabled. The value must be false for the instance to perform NAT. For more information, see NAT Instances in the Amazon Virtual Private Cloud User Guide.
                Hypervisor — (String)

                The hypervisor type of the instance.
                Possible values include:
                    "ovm"
                    "xen"
                NetworkInterfaces — (Array<map>)

                [EC2-VPC] One or more network interfaces for the instance.
                    NetworkInterfaceId — (String)

                    The ID of the network interface.
                    SubnetId — (String)

                    The ID of the subnet.
                    VpcId — (String)

                    The ID of the VPC.
                    Description — (String)

                    The description.
                    OwnerId — (String)

                    The ID of the AWS account that created the network interface.
                    Status — (String)

                    The status of the network interface.
                    Possible values include:
                        "available"
                        "attaching"
                        "in-use"
                        "detaching"
                    MacAddress — (String)

                    The MAC address.
                    PrivateIpAddress — (String)

                    The IP address of the network interface within the subnet.
                    PrivateDnsName — (String)

                    The private DNS name.
                    SourceDestCheck — (Boolean)

                    Indicates whether to validate network traffic to or from this network interface.
                    Groups — (Array<map>)

                    One or more security groups.
                        GroupName — (String)

                        The name of the security group.
                        GroupId — (String)

                        The ID of the security group.
                    Attachment — (map)

                    The network interface attachment.
                        AttachmentId — (String)

                        The ID of the network interface attachment.
                        DeviceIndex — (Integer)

                        The index of the device on the instance for the network interface attachment.
                        Status — (String)

                        The attachment state.
                        Possible values include:
                            "attaching"
                            "attached"
                            "detaching"
                            "detached"
                        AttachTime — (Date)

                        The time stamp when the attachment initiated.
                        DeleteOnTermination — (Boolean)

                        Indicates whether the network interface is deleted when the instance is terminated.
                    Association — (map)

                    The association information for an Elastic IP associated with the network interface.
                        PublicIp — (String)

                        The public IP address or Elastic IP address bound to the network interface.
                        PublicDnsName — (String)

                        The public DNS name.
                        IpOwnerId — (String)

                        The ID of the owner of the Elastic IP address.
                    PrivateIpAddresses — (Array<map>)

                    The private IP addresses associated with the network interface.
                        PrivateIpAddress — (String)

                        The private IP address of the network interface.
                        PrivateDnsName — (String)

                        The private DNS name.
                        Primary — (Boolean)

                        Indicates whether this IP address is the primary private IP address of the network interface.
                        Association — (map)

                        The association information for an Elastic IP address for the network interface.
                            PublicIp — (String)

                            The public IP address or Elastic IP address bound to the network interface.
                            PublicDnsName — (String)

                            The public DNS name.
                            IpOwnerId — (String)

                            The ID of the owner of the Elastic IP address.
                IamInstanceProfile — (map)

                The IAM instance profile associated with the instance, if applicable.
                    Arn — (String)

                    The Amazon Resource Name (ARN) of the instance profile.
                    Id — (String)

                    The ID of the instance profile.
                EbsOptimized — (Boolean)

                Indicates whether the instance is optimized for EBS I/O. This optimization provides dedicated throughput to Amazon EBS and an optimized configuration stack to provide optimal I/O performance. This optimization isn't available with all instance types. Additional usage charges apply when using an EBS Optimized instance.
                SriovNetSupport — (String)

                Specifies whether enhanced networking is enabled.
        NextToken — (String)

        The token to use to retrieve the next page of results. This value is null when there are no more results to return.


*/



