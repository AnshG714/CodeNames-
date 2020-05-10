import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  type: "service_account",
  project_id: "codenames-plus",
  private_key_id: "86d4ad8520b4621f45a87d972e33d42cc0e70e10",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCPqLnkkT7duDhd\nNdrDW//npUMuI88UZysZq0bBiLMyiHGMXaL9e5h2652Btaak+QLQvgdhO9q/OTv7\n3120lBtdUe7WhhI17jnAe7r7uNAq1C2R6v/GBxMLANNQfcl7PVLnZJnmxQDJ4YLC\nQHCHfZG65F/FpaFkn4SgfrosfUsElYqUFgje9n4tx9OJwbew77DYgs4wQ71G2kHA\nmf7kUu15ElYO5E+2VmET0Cdwfk7JbTATbJp3DPJ/zvB1P4W2pqv+yeMVKPbZu+Hz\nHEvMJUt0fYQQEORxWdKsKEBtRipmKHCUdUVL+17cNzgey7WQOYmJuufOPH4KqgiI\nUKz75TerAgMBAAECggEAFkXxtGd0mMnEK2d7KIjuD0tHNDMnGyG3w/4TNVRtfCs9\nd6bY63YrOFzlicPRN4jID/c2i7PNAZLtIusJy0KfT4OxhR86WZQ67gYBAqAv3kQR\nYKtPxrM4F5+kI7ms8Gecn/WwCuCGc8Z8EIQPLmKgoppf4vQAJuq4lG2xjc5LQEV3\nu2l1rQM6mA2qcRvNnQNJjYgihBl2MxiLSZ/Eyt4m1K4eq0D6Zs4F0bFOS9STtj9f\nZNA/dxKpZXhx537fzsjwqWp+cr5K9gmSlibovOJZdiv2wUSQgpZTIC9modOQo7/T\nUqkjCKXcPllZgNbj75/muKjIXlUupC8l84sgmF6ncQKBgQDGf7nVhopZuMVtt3uN\n2AGvPTGrqlLZw7QlNe7lxOFzcMq5vSQ6NMvBilYUuw3b3tnvvEV35qoP2ZWs4mOl\nEslaP7UXXfCzhkMJG8JaMQ3Jfj22kA8HOZjRnTI4KUfMcvdAXO68GZuezYdRHrq5\nUGnXU317khNjklE5cJuE11g4AwKBgQC5RjCWPyEy9j/8SbBwuUm/+tyih6edr0VK\n3rCuSFw+1G5TWNa+D9Qf6NWawUI0HHU6ioIN8moUQPJBvGj1VVCY9kDDa7gBgpJ0\nOMpqCkW7CgqRoeK6v4Fe0azScdeoHUFJJaaxD0frSR+EYn2ngfNc1tdiiEJF8kSM\nnMhGnY2VOQKBgQC1wXR+8Q+zsf2NRinrKrP4KtdVccMlRQ6p1+WlHI63brsiMe9/\nIKLF2A6UMucwwbDa1JDjhiGIG9ryj+Vf3IDkk1sVR15EdBbjuzhN74bJTj/h76zj\nF7k3jnHSfPISYd7GX5H2SJh3Y4iZHcMqNliD4x4OTSZV0T9wkgzFKY3M0wKBgFJJ\nNT0VrrYGnmZ7h+yYroOgdCuPWkdzV7An9YqCQs345UMJOt7RAuJlM7F20eN5HCuy\n5o4xMyHpsm61slv71z8IZ70jc2bgShFqQ6QTCeNHU2hY4O0WLuwg7cPNof1deOh2\n23DaG5QJNwFCCRLDaYW7OY/eeqi8L+vPmjeatA4pAoGAVqYlr3RY9mEZ9KVqFSKS\n9oz+uCjqyv8xuvAxnV4jnpnG5PMKfMF0yMz5RFFTkrhM7MQcp25u2AYtpU+8hLwO\nT5MVTzqzZcucLOYHg1NpM7LUBwwvpoD3YUp06HLLxGbj3Pw8i86GaePNeVyldywz\n6tK4Nc18wTzx9azlvK4gRMY=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-nlggu@codenames-plus.iam.gserviceaccount.com",
  client_id: "117939916897907247603",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_url: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nlggu%40codenames-plus.iam.gserviceaccount.com"
};

export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAppAuth = firebaseApp.auth();
