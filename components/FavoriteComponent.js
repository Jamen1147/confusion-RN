import React from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
  Modal,
  StyleSheet
} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
