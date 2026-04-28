// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
// import cvReducer from "./cvSlice";
import adminUsersReducer from "./adminUsersSlice";
import achievementReducer from "../features/achievements/achievementsSlice";
import certificatesReducer from "../features/certificates/certificatesSlice";
import experienceReducer from "../features/experiences/workExperiencesSlice";
import skillsReducer from "../features/skills/skillsSlice";
import languagesReducer from "../features/languages/languagesSlice";
import authentReducer from "../features/auth/authSlice";
import jobReducer from "../features/jobs/jobsSlice";
import letterReducer from "../features/letters/lettersSlice";
import personalDetailsReducer from "../features/personalDetails/personalDetailsSlice";
import projectsReducer from "../features/projects/projectsSlice";
import careerObjectiveReducer from "../features/carerobjectives/carerObjectivesSlice";
import educationsReducer from "../features/educations/educationsSlice";
import civReducer from "../features/cv/cvSlice";
import paymentReducer from "../features/payments/paymentsSlice";
import referenceReducer from "../features/references/referencesSlice";
import downloadsReducer from "../features/downloads/downloadsSlice"
import documentsReducer from "../features/documents/documentsSlice";
import uiReducer from "../store/uiSlice"
import risalaReducer from "../features/risala/risalaSlice";
import docRequestsReducer from "./docRequestsSlice";
// import profileReducer from "../features/certificates/profileSlice";


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// ✅ Persist config for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["access", "refresh", "user"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authentReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    // cv: cvReducer,
    adminUsers: adminUsersReducer,
    jobs: jobReducer, // <-- added jobs slice here
    achievements: achievementReducer,
    certificates: certificatesReducer,
    experiences: experienceReducer,
    skills: skillsReducer,
    languages: languagesReducer,
    cv: civReducer,
    risala: risalaReducer,
    payments: paymentReducer,
    downloads: downloadsReducer,
    documents: documentsReducer,
    ui: uiReducer,
    references: referenceReducer,
    docRequests: docRequestsReducer,
    careerObjectives: careerObjectiveReducer,
    personalDetails: personalDetailsReducer,
    educations: educationsReducer,
    // profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
